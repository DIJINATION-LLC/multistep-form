import axios from "axios";
import { getValidToken } from "./tokenService";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ATHENA_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
