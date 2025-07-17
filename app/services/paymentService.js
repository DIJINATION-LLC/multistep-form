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

