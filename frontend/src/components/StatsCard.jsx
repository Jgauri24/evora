export default function StatsCard({ title, value, subtext }) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
    );
  }