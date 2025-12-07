import { useEffect, useState } from 'react';

export default function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value ?? '');
  useEffect(() => setInput(value ?? ''), [value]);

  const handleSearch = () => {
    onChange?.(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <div className="flex gap-2">
        <input
          aria-label="Search events"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
          placeholder="Search events..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
}