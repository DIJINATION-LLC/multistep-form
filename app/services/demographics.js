import api from "./api";
import API_ROUTES from "./endpoints";

export const getLanguages = async () => {
  const res = await api.get(API_ROUTES.LANGUAGES);
  return res.data.map((item) => ({ id: item.iso6392code, name: item.name }));
};

export const getEthnicities = async () => {
  const res = await api.get(API_ROUTES.ETHNICITIES);
  return res.data.map((item) => ({ id: item.ethnicityid, name: item.name }));
};

export const getRaces = async () => {
  const res = await api.get(API_ROUTES.RACES);
  return res.data.map((item) => ({ id: item.raceid, name: item.name }));
};

export const getOccupations = async () => {
  const res = await api.get(API_ROUTES.OCCUPATIONS);
  return res.data.map((item) => ({ code: item.code, name: item.name }));
};
