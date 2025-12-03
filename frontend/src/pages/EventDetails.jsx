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

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  const isOnline = event.mode === 'online';
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
        <img src={event.imageUrl || 'https://via.placeholder.com/1200x600'} alt={event.title} className="w-full aspect-video object-cover rounded-xl" />
        <h1 className="text-2xl font-semibold mt-4">{event.title}</h1>
        <p className="text-gray-600 mt-2">{new Date(event.startAt).toLocaleString()} - {new Date(event.endAt).toLocaleString()}</p>
        <p className="mt-4 leading-relaxed">{event.description}</p>
      </div>
      <aside className="space-y-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="font-semibold mb-2">Details</p>
          <p className="text-sm">Category: {event.category}</p>
          <p className="text-sm">Mode: {event.mode}</p>
          <p className="text-sm">Location: {event.location}</p>
          <p className="text-sm">Capacity: {event.capacity}</p>
          <p className="text-sm">Price: {event.price === 0 ? 'Free' : `$${event.price}`}</p>
          <button className="mt-3 w-full px-4 py-2 rounded-2xl bg-primary text-white">Book Now</button>
        </div>
        {!isOnline && (
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="font-semibold mb-2">Map preview</p>
            <div className="w-full h-40 bg-gray-100 rounded-xl" aria-label="Map preview" />
          </div>
        )}
      </aside>
    </div>
  );
}