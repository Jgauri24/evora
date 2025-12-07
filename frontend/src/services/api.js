import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://evora-vx66.onrender.com/api",
});

// Attach token automatically for ALL requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------- ALL API ROUTES ---------

// Auth
export const signupAPI = (data) => API.post("/auth/signup", data);
export const loginAPI = (data) => API.post("/auth/login", data);


// Dashboard
export const fetchDashboard = () => API.get("/dashboard");

// Events
export const fetchEvents = (params) => API.get('/events', { params });
export const fetchEventById = (id) => API.get(`/events/${id}`);

// Event
export const bookEvent = (id) => API.post(`/events/${id}/book`);

// Bookings 
export const fetchMyBookings=()=>API.get("/bookings")
export const cancelBooking=(id)=>API.delete(`/bookings/${id}`)
export const markAsAttended=(id)=>API.patch(`/bookings/${id}/attend`)

// Events Management (Admin)
export const createEvent = (data) => API.post('/events', data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// Profile
export const fetchProfile = () => API.get('/profile');
export const updateProfile = (data) => API.put('/profile', data);

export default API;
