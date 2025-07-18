import api from "./api";
import API_ROUTES from "./endpoints";

export const getPaymentPlan = async (patientId, departmentId) => {
  const response = await api.get(`${API_ROUTES.PAYMENT_PLAN(patientId)}`, {
    params: { departmentid: departmentId },
  });
  return response.data;
};

export const getAppointmentDetails = async (departmentId) => {
  const response = await api.get(`${API_ROUTES.APPOINTMENTS(departmentId)}`);
  return response.data;
};

export const getInsuranceDetails = async (departmentId) => {
  const response = await api.get(`${API_ROUTES.APPOINTMENTS(departmentId)}/insurances`);
  return response.data;
};

export const uploadPatientPhoto = async (patientId, departmentId, imageBase64) => {
  const formData = new FormData();
  formData.append('image', imageBase64);
  formData.append('departmentid', departmentId);

  const response = await api.post(`${API_ROUTES.PATIENT_PHOTO(patientId)}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const updatePatient = async (patientId, payload) => {
  const response = await api.put(`${API_ROUTES.UPDATE_PATIENT(patientId)}`, new URLSearchParams(payload));
  return response.data;
};



