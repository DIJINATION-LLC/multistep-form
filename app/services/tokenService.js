import axios from "axios";

const TOKEN_KEY = "athenaToken";
const TOKEN_EXPIRY_KEY = "athenaTokenExpiry";

export const fetchToken = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth2/v1/token`,
    new URLSearchParams({
      grant_type: "client_credentials",
      scope: "athena/service/Athenanet.MDP.*",
    }),
    {
      auth: {
        username: process.env.NEXT_PUBLIC_CLIENT_ID,
        password: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      },
    }
  );

  const token = response.data.access_token;
  const expiry = Date.now() + response.data.expires_in * 1000; // ms

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiry);

  return token;
};

export const getValidToken = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!token || !expiry || Date.now() > Number(expiry)) {
    return await fetchToken(); // get new token if expired or missing
  }
  return token;
};
