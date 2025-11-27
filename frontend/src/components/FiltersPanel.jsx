import { useEffect, useState } from 'react';

export default function FiltersPanel({ initial, onApply, onClear }) {
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState(initial || {});
  useEffect(() => setFilters(initial || {}), [initial]);

  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button onClick={() => setOpen((o) => !o)} className="text-sm text-primary">{open ? 'Hide' : 'Show'}</button>
      </div>
      {open && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select className="w-full border rounded-2xl px-3 py-2" value={filters.category || ''} onChange={(e) => update('category', e.target.value || undefined)}>
              <option value="">All</option>
              <option>Workshop</option>
              <option>Concert</option>
              <option>Conference</option>
              <option>Meetup</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Mode</label>
            <select className="w-full border rounded-2xl px-3 py-2" value={filters.mode || ''} onChange={(e) => update('mode', e.target.value || undefined)}>
              <option value="">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Date From</label>
            <input type="date" className="w-full border rounded-2xl px-3 py-2" value={filters.dateFrom || ''} onChange={(e) => update('dateFrom', e.target.value || undefined)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Date To</label>
            <input type="date" className="w-full border rounded-2xl px-3 py-2" value={filters.dateTo || ''} onChange={(e) => update('dateTo', e.target.value || undefined)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Min Price</label>
            <input type="number" min="0" className="w-full border rounded-2xl px-3 py-2" value={filters.minPrice || ''} onChange={(e) => update('minPrice', e.target.value || undefined)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Max Price</label>
            <input type="number" min="0" className="w-full border rounded-2xl px-3 py-2" value={filters.maxPrice || ''} onChange={(e) => update('maxPrice', e.target.value || undefined)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Sort</label>
            <select className="w-full border rounded-2xl px-3 py-2" value={filters.sort || ''} onChange={(e) => update('sort', e.target.value || undefined)}>
              <option value="">Newest</option>
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      )}
      <div className="mt-4 flex gap-3">
        <button onClick={() => onApply?.(filters)} className="px-4 py-2 rounded-2xl bg-primary text-white">Apply</button>
        <button onClick={() => onClear?.()} className="px-4 py-2 rounded-2xl bg-gray-100">Clear</button>
      </div>
    </div>
  );
}