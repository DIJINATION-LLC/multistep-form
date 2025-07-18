

const paracticeId = process.env.NEXT_PUBLIC_PRACTICE_ID
const API_ROUTES = {
  PATIENTS : `/v1/${paracticeId}/patients` , 
  PAYMENT_PLAN: (patientId) => `/v1/${paracticeId}/patients/${patientId}/collectpayment/paymentplan`,
  APPOINTMENTS: (departmentId) => `/v1/${paracticeId}/appointments/${departmentId}`,
  PATIENT_PHOTO:(patientId) => `/v1/${paracticeId}/patients/${patientId}/photo`,

};

export default API_ROUTES;
