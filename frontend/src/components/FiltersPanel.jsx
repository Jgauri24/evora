import { useEffect, useState } from 'react';

export default function FiltersPanel({ initial, onApply, onClear }) {
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState(initial || {});
  useEffect(() => setFilters(initial || {}), [initial]);

  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-xl text-black">Filters</h3>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          {open ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      {open && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</label>
            <select
              className="input-field"
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
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Mode</label>
            <select
              className="input-field"
              value={filters.mode || ''}
              onChange={(e) => update('mode', e.target.value || undefined)}
            >
              <option value="">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Date From</label>
            <input
              type="date"
              className="input-field"
              value={filters.dateFrom || ''}
              onChange={(e) => update('dateFrom', e.target.value || undefined)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Date To</label>
            <input
              type="date"
              className="input-field"
              value={filters.dateTo || ''}
              onChange={(e) => update('dateTo', e.target.value || undefined)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Min Price</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              className="input-field"
              value={filters.minPrice || ''}
              onChange={(e) => update('minPrice', e.target.value || undefined)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Max Price</label>
            <input
              type="number"
              min="0"
              placeholder="Any"
              className="input-field"
              value={filters.maxPrice || ''}
              onChange={(e) => update('maxPrice', e.target.value || undefined)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Sort By</label>
            <select
              className="input-field"
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
      )}
      <div className="mt-6 flex gap-3 pt-6 border-t border-gray-200">
        <button onClick={() => onApply?.(filters)} className="btn-primary">Apply Filters</button>
        <button onClick={() => onClear?.()} className="btn-secondary">Clear All</button>
      </div>
    </div>
  );
}