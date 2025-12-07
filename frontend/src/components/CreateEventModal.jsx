
import { useState } from 'react';

export default function CreateEventModal({ open, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        mode: 'offline', // Added mode field
        startAt: '',
        endAt: '',
        price: 0,
        capacity: 0,
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'capacity' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSuccess(formData);
            setFormData({
                title: '',
                description: '',
                category: '',
                location: '',
                mode: 'offline', // Added mode field
                startAt: '',
                endAt: '',
                price: 0,
                capacity: 0,
                imageUrl: ''
            });
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-black">Create New Event</h2>
                    <p className="text-sm text-gray-600 mt-1">Fill in the details below</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2">
                            Event Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="Enter event title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                            placeholder="Describe your event"
                        />
                    </div>

                    {/* Category and Mode */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Category *
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Music, Tech"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Mode *
                            </label>
                            <select
                                name="mode"
                                value={formData.mode}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                <option value="offline">Offline</option>
                                <option value="online">Online</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            placeholder="Event location"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Start Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                name="startAt"
                                value={formData.startAt}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                End Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                name="endAt"
                                value={formData.endAt}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Price and Capacity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                                Capacity *
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                placeholder="100"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2">
                            Image URL (Optional)
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

