import api from "./api";
import API_ROUTES from "./endpoints";

export const postQuestionnaireScreener = async ({ encounterId, templateids }) => {
  const formData = new URLSearchParams();
  formData.append("templateids", JSON.stringify(templateids)); 

  const response = await api.post(
    API_ROUTES.QUESTIONNAIRE(encounterId),
    formData,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data;
};


//to get wellness questionnaire based on template ids 

export const getQuestionnaire = async ({encounterId , patientId , departmentId})=> {

  const response = await api.fetchFromAthena({
    path : `${API_ROUTES.GET_QUESTIONNAIRE}`,
    query : {
      departmentid : departmentId,
      patientid : patientId,
      encounterid : encounterId,
    }
  })
  return response ;

}