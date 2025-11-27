export default function BookingModal({ open, event, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-2">Confirm Booking</h3>
        <p className="text-sm text-gray-600">{event?.title}</p>
        <p className="text-sm text-gray-600">{new Date(event?.startAt).toLocaleString()}</p>
        <p className="text-sm mt-2">Price: <span className="font-semibold">{event?.price === 0 ? 'Free' : `$${event?.price}`}</span></p>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-2xl bg-gray-100">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-2xl bg-primary text-white">Confirm</button>
        </div>
      </div>
    </div>
  );
}