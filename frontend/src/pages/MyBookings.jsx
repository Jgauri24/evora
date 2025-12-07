import { useEffect, useState } from 'react';
import { cancelBooking, fetchMyBookings, markAsAttended } from '../services/api.js';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = () => {
    setLoading(true);
    fetchMyBookings()
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const onCancel = async (id) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(id);
      load();
    }
  };

  const onMarkAttended = async (id) => {
    await markAsAttended(id);
    load();
  };

  if (loading) return <div className="container py-8"><p className="text-gray-600">Loading bookings...</p></div>;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-gray-600">Manage your event bookings</p>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => {
          const isPast = new Date(b.event.endAt) < new Date();
          const isBooked = b.status === 'booked';
          const isAttended = b.status === 'attended';

          return (
            <div key={b.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-lg text-black">{b.event.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(b.event.startAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: <span className="capitalize font-medium">{b.status}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  {isBooked && (
                    <>
                      <button onClick={() => onCancel(b.id)} className="btn-secondary">
                        Cancel
                      </button>
                      <button onClick={() => onMarkAttended(b.id)} className="btn-primary">
                        Mark as Attended
                      </button>
                    </>
                  )}
                  {isAttended && (
                    <span className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium">
                      ✓ Attended
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {!bookings.length && (
          <div className="text-center py-12">
            <p className="text-gray-600">No bookings yet.</p>
            <p className="text-sm text-gray-500 mt-2">Start exploring events to make your first booking!</p>
          </div>
        )}
      </div>
    </div>
  );
}