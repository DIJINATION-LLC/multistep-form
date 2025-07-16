

const paracticeId = process.env.NEXT_PUBLIC_PRACTICE_ID
const API_ROUTES = {
  USER: "/users",
  LOGIN: "/auth/login",
  WELLNESS: "/wellness",
  SURVEY: "/survey",
  PATIENTS : `/v1/${paracticeId}/patients`
};

export default API_ROUTES;
