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
        className="w-full px-5 py-3.5 rounded-xl bg-white text-black border border-gray-300 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
        placeholder="Search events..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}