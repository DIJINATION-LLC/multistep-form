import api from "./api";
import API_ROUTES from "./endpoints";

export const getPaymentPlan = async (patientId, departmentId) => {
  const response = await api.fetchFromAthena({
    path: `${API_ROUTES.PAYMENT_PLAN(patientId)}`,
    query: { departmentid: departmentId },
  });
  return response.data;
};

export const getAppointmentDetails = async (departmentId) => {
  const response = await api.fetchFromAthena({path: `${API_ROUTES.APPOINTMENTS(departmentId)}`});
  return response.data;
};

export const getInsuranceDetails = async (departmentId) => {
  const response = await api.fetchFromAthena({path: `${API_ROUTES.APPOINTMENTS(departmentId)}/insurances`});
  return response.data;
};

export const uploadPatientPhoto = async (patientId, departmentId, imageBase64) => {
  const formData = new FormData();
  formData.append('image', imageBase64);
  formData.append('departmentid', departmentId);

  // const response = await api.post(`${API_ROUTES.PATIENT_PHOTO(patientId)}`, formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // });
  const response = await fetch("/api/athena-proxy", {
    method: "POST",
    body: formData,
  });

  return await response.json();

  return response.data;
};

export const updatePatient = async (patientId, payload) => {
  // const response = await api.put(`${API_ROUTES.UPDATE_PATIENT(patientId)}`, new URLSearchParams(payload));
  const response = await fetch("/api/athena-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `/v1/${practiceId}/patients/${patientId}`,
      method: "PUT",
      contentType: "application/x-www-form-urlencoded",
      body: new URLSearchParams(payload).toString(),
    }),
  });
  return response.data;
};

export const uploadPatientSignature = async (patientId, formData) => {
  // const response = await api.post(`${API_ROUTES.PATIENT_SIGNATURE(patientId)}`, formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // });
  const response = await fetch("/api/athena-proxy", {
    method: "POST",
    body: formData,
  });

  return response.data;
};

export const addQuestions = async (patientId, encounterId, payload) => {
  // const response = await api.post(`${API_ROUTES.ADD_QUESTIONS(patientId, encounterId)}`, new URLSearchParams(payload));
  const response = await fetch("/api/athena-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `/v1/${practiceId}/chart/encounter/${encounterId}/questionnairescreeners`,
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      body: new URLSearchParams(payload).toString(),
    }),
  });
  return response.data;
};
