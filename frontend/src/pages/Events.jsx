import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import FiltersPanel from '../components/FiltersPanel.jsx';
import EventList from '../components/EventList.jsx';
import Pagination from '../components/Pagination.jsx';
import BookingModal from '../components/BookingModal.jsx';
import CreateEventModal from '../components/CreateEventModal.jsx';
import { bookEvent, fetchEvents, createEvent, deleteEvent } from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Events() {
  const q = useQuery();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pageSize: 10, totalPages: 1, total: 0 });
  const [selected, setSelected] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const params = useMemo(() => Object.fromEntries(q.entries()), [q]);
  const page = Number(params.page || 1);
  console.log(page, "events comp")

  const loadEvents = () => {
    setLoading(true);
    fetchEvents(params)
      .then((res) => {
        setEvents(res.data.data);
        setMeta(res.data.meta);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, [params]);

  const updateQuery = (newParams) => {
    const merged = { ...params, ...newParams };
    Object.keys(merged).forEach((k) => (merged[k] === undefined || merged[k] === '') && delete merged[k]);
    const usp = new URLSearchParams(merged);
    navigate({ pathname: '/events', search: `?${usp.toString()}` }, { replace: false });
  };

  const onBook = (event) => setSelected(event);
  const onConfirmBooking = async () => {
    try {
      if (!token) return navigate(`/login?return=${encodeURIComponent(location.pathname + location.search)}`);
      await bookEvent(selected.id);
      alert('Booking successful');
      setSelected(null);
    } catch {
      alert('Booking failed');
    }
  };

  const onCreateEvent = async (data) => {
    try {
      await createEvent(data);
      alert('Event created successfully!');
      setShowCreateModal(false);
      loadEvents();
    } catch (error) {
      alert('Failed to create event. Please try again.');
      throw error;
    }
  };

  const onDelete = async (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
        alert('Event deleted successfully!');
        loadEvents();
      } catch (error) {
        alert('Failed to delete event. You may not have permission.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Discover Events</h1>
        <p className="text-gray-600">Find and book amazing events near you</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-4">
          <SearchBar value={params.search || ''} onChange={(v) => updateQuery({ search: v, page: 1 })} />
          <FiltersPanel
            initial={params}
            onApply={(f) => updateQuery({ ...f, page: 1 })}
            onClear={() => navigate('/events')}
          />
        </div>

        {/* Events List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  {meta.total} {meta.total === 1 ? 'event' : 'events'} found
                </p>
              </div>

              {/* Event cards */}
              {events.length > 0 ? (
                <>
                  <EventList events={events} onBook={onBook} onDelete={onDelete} />
                  <div className="mt-8">
                    <Pagination page={page} totalPages={meta.totalPages} onPageChange={(p) => updateQuery({ page: p })} />
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No events found</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <BookingModal open={!!selected} event={selected} onClose={() => setSelected(null)} onConfirm={onConfirmBooking} />
      <CreateEventModal open={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={onCreateEvent} />

      {/* Create Event Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center text-2xl z-50"
        aria-label="Create new event"
      >
        +
      </button>
    </div>
  );
}