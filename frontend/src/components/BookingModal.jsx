export default function BookingModal({ open, event, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-200">
        <h3 className="text-2xl font-bold mb-4 text-black">Confirm Booking</h3>
        <div className="space-y-2 mb-6">
          <p className="text-base font-medium text-black">{event?.title}</p>
          <p className="text-sm text-gray-600">{new Date(event?.startAt).toLocaleString()}</p>
          <p className="text-base mt-3">Price: <span className="font-bold text-black">{event?.price === 0 ? 'Free' : `$${event?.price}`}</span></p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="btn-primary">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}