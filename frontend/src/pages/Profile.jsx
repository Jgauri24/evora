import { useEffect, useState } from 'react';
import { updateProfile } from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ phone: '', city: '', bio: '', avatar: '' });
  const [loading, setLoading] = useState(false);
  useEffect(() => {

  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      alert('Profile updated');
    } catch  {
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
      <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="w-full border rounded-2xl px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="w-full border rounded-2xl px-3 py-2" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input className="w-full border rounded-2xl px-3 py-2" placeholder="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
        <textarea className="w-full border rounded-2xl px-3 py-2" placeholder="Bio" rows="4" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <button disabled={loading} className="px-4 py-2 rounded-2xl bg-primary text-white">{loading ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}