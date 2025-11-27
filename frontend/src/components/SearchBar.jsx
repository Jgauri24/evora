import { useEffect, useState } from 'react';

export default function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value ?? '');
  useEffect(() => setInput(value ?? ''), [value]);
  useEffect(() => {
    const t = setTimeout(() => onChange?.(input), 300);
    return () => clearTimeout(t);
  }, [input, onChange]);
  return (
    <div className="w-full">
      <input
        aria-label="Search events"
        className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Search events..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}