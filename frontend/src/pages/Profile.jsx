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
  const [isEditing, setIsEditing] = useState(false);

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
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-6">
        <div>

          <p className="mt-2 text-lg text-gray-600">Manage your account information.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary sm:w-auto px-8"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-md border-2 border-gray-100 overflow-hidden">
        <div className="p-8 border-b-2 border-gray-100 bg-gray-50">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">{user?.name || 'User'}</h2>
              <p className="text-gray-600 font-medium">{user?.email}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black text-white mt-2 uppercase tracking-wide">
                {user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={onSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-4">Personal Information</h3>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Phone Number</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="input-field"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Bio</label>
                <div className="mt-2">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className="input-field"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Location</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="input-field"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-gray-100">
              <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-6">Social Profiles</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-3">
                <div>
                  <label htmlFor="instagram" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Instagram</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      className="input-field"
                      placeholder="@username"
                      value={form.instagram}
                      onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Twitter</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      className="input-field"
                      placeholder="@username"
                      value={form.twitter}
                      onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">LinkedIn</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      className="input-field"
                      placeholder="Profile URL"
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-secondary sm:w-auto px-8"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary sm:w-auto px-8"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-4">Personal Information</h3>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Name</p>
                <p className="mt-1 text-lg font-medium text-black">{form.name || '-'}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Phone Number</p>
                <p className="mt-1 text-lg font-medium text-black">{form.phone || '-'}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Bio</p>
                <p className="mt-1 text-lg text-gray-800 leading-relaxed">{form.bio || 'No bio provided.'}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Location</p>
                <p className="mt-1 text-lg font-medium text-black">{form.location || '-'}</p>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-gray-100">
              <h3 className="text-lg font-bold text-black uppercase tracking-wide mb-6">Social Profiles</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Instagram</p>
                  <p className="mt-1 text-base font-medium text-black">{form.instagram || '-'}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Twitter</p>
                  <p className="mt-1 text-base font-medium text-black">{form.twitter || '-'}</p>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">LinkedIn</p>
                  <p className="mt-1 text-base font-medium text-black">{form.linkedin || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}