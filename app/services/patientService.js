import api from "./api";
import API_ROUTES from "./endpoints";

export const searchPatient = async (firstName, lastName, dob) => {
  const response = await api.get(`${API_ROUTES.PATIENTS}`, {
    params: {
      firstname: firstName,
      lastname: lastName,
      dob: dob,
    },
  });
  return response.data;
};
