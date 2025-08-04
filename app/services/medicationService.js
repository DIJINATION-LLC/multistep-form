// medicationService.js

import api from "./api";
import API_ROUTES from "./endpoints";

export const getMedications = async (patientId, departmentId) => {
  // const response = await api.get(`${API_ROUTES.MEDICATIONS(patientId)}?departmentid=${departmentId}`);
  const res = await api.fetchFromAthena({ path: `${API_ROUTES.MEDICATIONS(patientId)}?departmentid=${departmentId}` });
  return res.medications?.[0] || [];
};

export const searchMedication = async (query) => {
  // const response = await api.get(`${API_ROUTES.SEARCH_MEDICATIONS}?searchvalue=${query}`);
  const res = await api.fetchFromAthena({ path: `${API_ROUTES.SEARCH_MEDICATIONS}?searchvalue=${query}` });
  return res || [];
};

export const addMedication = async (payload, patientId) => {
  const formData = new URLSearchParams(payload);
  const response = await api.fetchFromAthena({ path: `/v1/${process.env.NEXT_PUBLIC_PRACTICE_ID}/chart/${patientId}/medications`, method: "POST", query: payload });
  return response;
};
