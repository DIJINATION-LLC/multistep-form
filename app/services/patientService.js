import api from "./api";
import API_ROUTES from "./endpoints";

export const searchPatient = async (firstName, lastName, dob) => {
  const response = await api.fetchFromAthena({
    path: `${API_ROUTES.PATIENTS}`,
    query: {
      firstname: firstName,
      lastname: lastName,
      dob: dob,
    },
  });
  return response;
};




// Repeated Here also in PaymentService.js

// export const getInsuranceDetails = async (departmentId) => {
  
//   const response = await api.fetchFromAthena(
//     {path: `${API_ROUTES.APPOINTMENTS}/${departmentId}/insurances`}
//   );
//   return response;
// };