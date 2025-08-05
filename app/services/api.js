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

const fetchFromAthena = async ({
  path,
  method = "GET",
  query = {},
  body = null,
  contentType = "application/json",
}) => {
  const response = await fetch("/api/athena-proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, method, query, body, contentType }),
  });

  return await response.json();
};
export default {api, fetchFromAthena};



