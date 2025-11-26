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

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Failed to load</p>;

  const categoryData = data.categoryBreakdown.map((d, i) => ({
    name: d.category,
    value: d.count,
    fill: COLORS[i % COLORS.length]
  }));

  const upcomingCount = data.upcomingBookings.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <StatsCard title="Attended" value={data.totalEventsAttended} />
        <StatsCard title="Upcoming" value={upcomingCount} />
        <StatsCard title="Categories" value={data.categoryBreakdown.length} />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Events by Category</h3>
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

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Attended Events — Last 12 months</h3>
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

      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">Upcoming vs Past</h3>
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
