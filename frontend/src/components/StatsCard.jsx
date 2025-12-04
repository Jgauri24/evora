export default function StatsCard({ title, value, subtext }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold mt-2 text-black">{value}</p>
      {subtext && <p className="text-sm text-gray-500 mt-2">{subtext}</p>}
    </div>
  );
}