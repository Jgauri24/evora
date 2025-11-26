import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
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
export const setRole = (data) => API.post("/auth/set-role", data);

// Dashboard
export const fetchDashboard = () => API.get("/dashboard");

// Events
export const getEvents = () => API.get("/events");
export const getEventById = (id) => API.get(`/events/${id}`);

// Bookings
export const bookEvent = (id) => API.post(`/events/${id}/book`);
export const cancelBooking = (id) => API.post(`/events/${id}/cancel`);

export default API;
