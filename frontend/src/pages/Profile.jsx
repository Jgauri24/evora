import { useEffect, useState } from 'react';
import { updateProfile } from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', avatar: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', avatar: user.avatar || '' });
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      alert('Profile updated');
    } catch {
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
        <input className="w-full border rounded-2xl px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border rounded-2xl px-3 py-2" placeholder="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
        <button disabled={loading} className="px-4 py-2 rounded-2xl  bg-blue-600 text-white">{loading ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}