import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: apiURL,
});

export const API_BASE_URL = apiURL.replace(/\/api$/, "");


// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("shakeToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// Drinks (public)
export const getDrinks = (category) =>
  API.get(`/drinks${category && category !== "all" ? `?category=${category}` : ""}`);
export const getDrinkById = (id) => API.get(`/drinks/${id}`);

// Drinks (admin CMS)
export const getAllDrinksAdmin = () => API.get("/drinks/admin/all");
export const createDrink = (formData) =>
  API.post("/drinks", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateDrink = (id, formData) =>
  API.put(`/drinks/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteDrink = (id) => API.delete(`/drinks/${id}`);

// Orders
export const placeOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

// Contact
export const submitContact = (data) => API.post("/contact", data);
export const getContacts = () => API.get("/contact");
export const deleteContact = (id) => API.delete(`/contact/${id}`);

export default API;
