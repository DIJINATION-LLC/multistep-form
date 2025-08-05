

const paracticeId = process.env.NEXT_PUBLIC_PRACTICE_ID
const API_ROUTES = {
  PATIENTS : `/v1/${paracticeId}/patients` , 
  PAYMENT_PLAN: (patientId) => `/v1/${paracticeId}/patients/${patientId}/collectpayment/paymentplan`,
  APPOINTMENTS: (departmentId) => `/v1/${paracticeId}/appointments/${departmentId}`,
  PATIENT_PHOTO:(patientId) => `/v1/${paracticeId}/patients/${patientId}/photo`,
  PATIENT_SIGNATURE:(patientId) => `/v1/${paracticeId}/patients/${patientId}/documents`,
  UPDATE_PATIENT:(patientId) => `/v1/${paracticeId}/patients/${patientId}`,
  LANGUAGES : `/v1/${paracticeId}/languages` , 
  ETHNICITIES : `/v1/${paracticeId}/ethnicities`,
  RACES : `/v1/${paracticeId}/races`,
  OCCUPATIONS : `/v1/${paracticeId}/occupations`,
  ALLERGIES: (patientId , departmentId) => `/v1/${paracticeId}/chart/${patientId}/allergies?departmentid=${departmentId}`,
  UPD_ALLERGIES : (patientId, departmentId) => `/v1/${paracticeId}/chart/${patientId}/allergies?departmentid=${departmentId}`,
  SURVEY: `/v1/${paracticeId}/patientsatisfaction/results`,
  ADD_QUESTIONS:(patientId,encounterId) => `/v1/${paracticeId}/chart/encounter/${encounterId}/questionnairescreeners`,
 MEDICATIONS: (patientId, departmentId) => `/v1/${paracticeId}/chart/${patientId}/medications`,
//  ADD_MEDICATION : (patientId)=> `/v1/${paracticeId}/chart/${patientId}/medications`,
 SEARCH_MEDICATIONS :  `/v1/${paracticeId}/reference/medications`,
 GET_QUESTIONNAIRE : `/v1/${paracticeId}/chart/configuration/questionnairescreeners` , 


};

export default API_ROUTES;
