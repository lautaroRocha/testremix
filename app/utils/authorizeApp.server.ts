import { authCookie, timeStampCookie } from "./cookies.server";
import { getAccessToken } from "./getToken.server";

export const authorizeApp = async () => {
  const token = await getAccessToken(); 
  try {
    if (token) {
      const authCookieSerialized = await authCookie.serialize(JSON.stringify(token.access_token));
      const timeStampCookieSerialized = await timeStampCookie.serialize(String(Date.now()));

      return {
        token: JSON.stringify(token.access_token),
        timestamp: String(Date.now()),
        cookies: [authCookieSerialized, timeStampCookieSerialized]
      };
    }
  } catch (e) {
    console.error(e);
    return {
      token: null,
      timestamp: null,
      cookies: [],
    };
  }
};
