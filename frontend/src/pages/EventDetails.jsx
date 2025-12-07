import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../services/api.js';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchEventById(id)
      .then((res) => setEvent(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black mb-2">Event Not Found</h2>
        <p className="text-gray-600">The event you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const isOnline = event.mode === 'online';
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Image */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={event.imageUrl || 'https://via.placeholder.com/1200x600'}
              alt={event.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-black text-white text-xs font-semibold rounded">
                {event.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-black mb-4">{event.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{new Date(event.startAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-black mb-3">About this event</h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Event Timeline */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">Event Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded font-bold text-xs">
                    START
                  </div>
                  <div>
                    <p className="font-medium text-black">{new Date(event.startAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Event begins</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 text-black flex items-center justify-center rounded font-bold text-xs">
                    END
                  </div>
                  <div>
                    <p className="font-medium text-black">{new Date(event.endAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Event concludes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Booking Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">Ticket Price</p>
                <p className="text-4xl font-bold text-black">
                  {event.price === 0 ? 'FREE' : `$${event.price}`}
                </p>
              </div>

              <button className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors font-medium mb-6">
                Book Now
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Available Seats</span>
                  <span className="font-semibold text-black">{event.capacity}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Event Mode</span>
                  <span className="font-semibold text-black capitalize">{event.mode}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-black">{event.category}</span>
                </div>
              </div>
            </div>

            {/* Location Card */}
            {!isOnline && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-3">Location</h3>
                <p className="text-gray-700 mb-4">{event.location}</p>
                <div className="w-full h-40 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Map Preview</p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}