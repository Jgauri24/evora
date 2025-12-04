import { useEffect, useState } from 'react';
import { fetchDashboard } from '../services/api.js';
import StatsCard from '../components/StatsCard.jsx';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const COLORS = ['#0066FF', '#FF6B6B', '#00C49F', '#FFBB28', '#8884d8'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container py-8"><p className="text-gray-600">Loading dashboard...</p></div>;
  if (!data) return <div className="container py-8"><p className="text-red-600">Failed to load dashboard</p></div>;

  const categoryData = data.categoryBreakdown.map((d, i) => ({
    name: d.category,
    value: d.count,
    fill: COLORS[i % COLORS.length]
  }));

  const upcomingCount = data.upcomingBookings.length;

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-gray-600">Your event analytics and statistics</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        <StatsCard title="Attended" value={data.totalEventsAttended} />
        <StatsCard title="Upcoming" value={upcomingCount} />
        <StatsCard title="Categories" value={data.categoryBreakdown.length} />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-lg text-black mb-4">Events by Category</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="value" data={categoryData} outerRadius={100} label>
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-lg text-black mb-4">Attended Events — Last 12 months</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#0066FF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-lg text-black mb-4">Upcoming vs Past</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ name: 'Events', upcoming: upcomingCount, past: data.totalEventsAttended }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="upcoming" fill="#0066FF" />
              <Bar dataKey="past" fill="#FF6B6B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
