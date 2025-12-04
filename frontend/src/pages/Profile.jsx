import { useEffect, useState } from 'react';
import { fetchProfile, updateProfile } from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: '',

    bio: '',
    phone: '',
    location: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data from API
    setFetchLoading(true);
    fetchProfile()
      .then((res) => {
        setForm({
          name: res.data.name || '',
          bio: res.data.bio || '',
          phone: res.data.phone || '',
          location: res.data.location || '',
          instagram: res.data.instagram || '',
          twitter: res.data.twitter || '',
          linkedin: res.data.linkedin || ''
        });
        setUser(res.data); // Update auth context with fresh data
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      })
      .finally(() => setFetchLoading(false));
  }, [setUser]);

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

  if (fetchLoading) {
    return (
      <div className="container py-8">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Your Profile</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Name</label>
                <input
                  className="input-field"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Phone</label>
                <input
                  className="input-field"
                  placeholder="+1 234 567 890"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Bio</label>
              <textarea
                className="input-field min-h-[100px]"
                placeholder="Tell us about yourself..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Location</label>
              <input
                className="input-field"
                placeholder="City, Country"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

  

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-black mb-4">Social Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Instagram</label>
                  <input
                    className="input-field"
                    placeholder="@username"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Twitter</label>
                  <input
                    className="input-field"
                    placeholder="@username"
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">LinkedIn</label>
                  <input
                    className="input-field"
                    placeholder="Profile URL"
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button disabled={loading} className="btn-primary w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}