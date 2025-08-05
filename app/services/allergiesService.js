import api from "./api"; 
import API_ROUTES from "./endpoints";

export const getAllergies = async (patientId , departmentId) => {
  const response = await api.fetchFromAthena({
    path : `${API_ROUTES.ALLERGIES(patientId , departmentId)}`,
    
  });
  return response;
};

export const updateAllergies = async ( patientId, departmentId,  payload ) => {
  const response = await api.fetchFromAthena(`${API_ROUTES.UPD_ALLERGIES(patientId , departmentId)}`, payload);
  return response;
};
