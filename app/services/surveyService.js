import api from "./api";
import API_ROUTES from "./endpoints";

export const submitSurvey = async (payload) => {
  const formData = new URLSearchParams();

  formData.append("startdate", payload.startdate);
  formData.append("enddate", payload.enddate);
  formData.append("averagescore", payload.averagescore);
  formData.append("providerdata", JSON.stringify(payload.providerdata));

  const response = await api.post(API_ROUTES.SURVEY, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  return response.data;
};
