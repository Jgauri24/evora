import { useEffect, useState } from 'react';

export default function FiltersPanel({ initial, onApply, onClear }) {
  const [filters, setFilters] = useState(initial || {});
  useEffect(() => setFilters(initial || {}), [initial]);

  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-semibold text-lg text-black mb-4">Filters</h3>

      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.category || ''}
            onChange={(e) => update('category', e.target.value || undefined)}
          >
            <option value="">All Categories</option>
            <option>Workshop</option>
            <option>Concert</option>
            <option>Conference</option>
            <option>Meetup</option>
          </select>
        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Mode</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.mode || ''}
            onChange={(e) => update('mode', e.target.value || undefined)}
          >
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date From</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.dateFrom || ''}
            onChange={(e) => update('dateFrom', e.target.value || undefined)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date To</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.dateTo || ''}
            onChange={(e) => update('dateTo', e.target.value || undefined)}
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Price</label>
          <input
            type="number"
            min="0"
            placeholder="$0"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.minPrice || ''}
            onChange={(e) => update('minPrice', e.target.value || undefined)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Price</label>
          <input
            type="number"
            min="0"
            placeholder="Any"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.maxPrice || ''}
            onChange={(e) => update('maxPrice', e.target.value || undefined)}
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort By</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            value={filters.sort || ''}
            onChange={(e) => update('sort', e.target.value || undefined)}
          >
            <option value="">Newest</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-5 border-t border-gray-200 space-y-2">
        <button
          onClick={() => onApply?.(filters)}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={() => onClear?.()}
          className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}