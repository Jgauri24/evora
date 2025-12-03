import { useEffect, useState } from 'react';
import { cancelBooking, fetchMyBookings } from '../services/api.js';

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
    await cancelBooking(id);
    load();
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{b.event.title}</p>
            <p className="text-sm text-gray-600">{new Date(b.event.startAt).toLocaleString()} • {b.status}</p>
          </div>
          {b.status === 'booked' && (
            <button onClick={() => onCancel(b.id)} className="px-4 py-2 rounded-2xl bg-accent text-white">Cancel</button>
          )}
        </div>
      ))}
      {!bookings.length && <p className="text-gray-600">No bookings yet.</p>}
    </div>
  );
}