import EventCard from './EventCard.jsx';

export default function EventList({ events, onBook }) {
  if (!events?.length) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p className="text-lg font-semibold">No events found</p>
        <p>Try adjusting filters or search terms.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => (
        <EventCard key={e.id} event={e} onBook={onBook} />
      ))}
    </div>
  );
}