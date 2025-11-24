import React from "react";

const BookingCard = ({ booking, isPast = false }) => {
  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow hover:scale-105 transition-transform">
      <h3 className="text-lg font-semibold">{booking.event?.name || booking.eventName}</h3>
      <p className="text-gray-300 mt-1">
        Date: {new Date(booking.event?.date || booking.date).toLocaleDateString()}
      </p>
      <p className="text-gray-300">Tickets: {booking.tickets || 1}</p>
      {isPast && <span className="text-sm text-gray-400 mt-2 block">Completed</span>}
    </div>
  );
};

export default BookingCard;
