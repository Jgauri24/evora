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

  if (loading) return <div className="container py-8"><p className="text-gray-600">Loading event...</p></div>;
  if (!event) return <div className="container py-8"><p className="text-red-600">Event not found</p></div>;

  const isOnline = event.mode === 'online';
  return (
    <div className="container mx-auto py-8 grid gap-8 md:grid-cols-3 max-w-7xl">
      <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <img src={event.imageUrl || 'https://via.placeholder.com/1200x600'} alt={event.title} className="w-full aspect-video object-cover rounded-lg mb-6" />
        <h1 className="text-3xl font-bold text-black mb-3">{event.title}</h1>
        <p className="text-gray-600 mb-6">{new Date(event.startAt).toLocaleString()} - {new Date(event.endAt).toLocaleString()}</p>
        <p className="text-gray-800 leading-relaxed">{event.description}</p>
      </div>
      <aside className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <p className="font-bold text-lg text-black mb-4">Event Details</p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700"><span className="font-semibold">Category:</span> {event.category}</p>
            <p className="text-gray-700"><span className="font-semibold">Mode:</span> {event.mode}</p>
            <p className="text-gray-700"><span className="font-semibold">Location:</span> {event.location}</p>
            <p className="text-gray-700"><span className="font-semibold">Capacity:</span> {event.capacity}</p>
            <p className="text-gray-700"><span className="font-semibold">Price:</span> {event.price === 0 ? 'Free' : `$${event.price}`}</p>
          </div>
        </div>
        {!isOnline && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="font-bold text-lg text-black mb-4">Location</p>
            <div className="w-full h-40 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center" aria-label="Map preview">
              <p className="text-gray-500 text-sm">Map Preview</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}