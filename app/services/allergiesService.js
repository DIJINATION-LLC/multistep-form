import api from "./api"; 
import API_ROUTES from "./endpoints";

export const getAllergies = async (patientId , departmentId) => {
  const response = await api.get(API_ROUTES.ALLERGIES(patientId , departmentId));
  return response.data;
};

export const updateAllergies = async ( patientId, departmentId,  payload ) => {
  const response = await api.put(`${API_ROUTES.UPD_ALLERGIES(patientId , departmentId)}`, payload);
  return response.data;
};
