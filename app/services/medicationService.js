// medicationService.js

import api from "./api";
import API_ROUTES from "./endpoints";

export const getMedications = async (patientId, departmentId) => {
  const response = await api.get(`${API_ROUTES.MEDICATIONS(patientId)}?departmentid=${departmentId}`);
  return response.data.medications?.[0] || [];
};

export const searchMedication = async (query) => {
  const response = await api.get(`${API_ROUTES.SEARCH_MEDICATIONS}?searchvalue=${query}`);
  return response.data || [];
};

export const addMedication = async (payload, patientId) => {
  const formData = new URLSearchParams(payload);
  const response = await api.post(`/v1/195900/chart/${patientId}/medications`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data;
};
