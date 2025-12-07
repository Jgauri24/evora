import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event, onBook, onDelete }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.imageUrl || 'https://via.placeholder.com/800x450'}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <button
          aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
          onClick={() => setSaved((s) => !s)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <span className={saved ? 'text-red-500' : 'text-gray-400'}>
            {saved ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Event Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Link
            to={`/events/${event.id}`}
            className="text-lg font-semibold text-black hover:text-gray-700 line-clamp-2 flex-1"
          >
            {event.title}
          </Link>
          <span className="text-lg font-bold text-black whitespace-nowrap">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{new Date(event.startAt).toLocaleDateString()}</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{event.category}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onBook?.(event)}
            className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Book Now
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors text-sm font-medium"
              aria-label="Delete event"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}