import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event, onBook }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      <div className="relative">
        <img src={event.imageUrl || 'https://via.placeholder.com/800x450'} alt={event.title} className="w-full aspect-video object-cover" />
        <button
          aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
          onClick={() => setSaved((s) => !s)}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow transition transform ${saved ? 'scale-110' : ''}`}
        >
          <span className={saved ? 'text-accent' : 'text-gray-600'}>❤</span>
        </button>
      </div>
      <div className="p-4">
        <Link to={`/events/${event.id}`} className="text-lg font-semibold hover:text-primary">{event.title}</Link>
        <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
          <span>{new Date(event.startAt).toLocaleString()}</span>
          <span className="font-semibold">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{event.category}</span>
          <button onClick={() => onBook?.(event)} className="px-4 py-2 rounded-2xl bg-primary text-white hover:bg-blue-700">Book</button>
        </div>
      </div>
    </div>
  );
}