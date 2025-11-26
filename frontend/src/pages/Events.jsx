import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import FiltersPanel from '../components/FiltersPanel.jsx';
import EventList from '../components/EventList.jsx';
import Pagination from '../components/Pagination.jsx';
import BookingModal from '../components/BookingModal.jsx';
import { bookEvent, fetchEvents } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

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

  const params = useMemo(() => Object.fromEntries(q.entries()), [q]);
  const page = Number(params.page || 1);

  useEffect(() => {
    setLoading(true);
    fetchEvents(params)
      .then((res) => {
        setEvents(res.data.data);
        setMeta(res.data.meta);
      })
      .finally(() => setLoading(false));
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

  return (
    <div className="space-y-6">
      <SearchBar value={params.search || ''} onChange={(v) => updateQuery({ search: v, page: 1 })} />
      <FiltersPanel
        initial={params}
        onApply={(f) => updateQuery({ ...f, page: 1 })}
        onClear={() => navigate('/events')}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-sm text-gray-600">{meta.total} results</p>
          <EventList events={events} onBook={onBook} />
          <Pagination page={page} totalPages={meta.totalPages} onPageChange={(p) => updateQuery({ page: p })} />
        </>
      )}
      <BookingModal open={!!selected} event={selected} onClose={() => setSelected(null)} onConfirm={onConfirmBooking} />
    </div>
  );
}