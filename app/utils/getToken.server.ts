import apiService from "~/config/API";
import { constants } from "~/config/constants";
import { authCookie, getCookie, timeStampCookie } from "./cookies.server";

interface AuthResponse {
    access_token: string
  }

export const getAccessToken = async (cookiesHeader?: string) => {
  const token = await getCookie(cookiesHeader || "", authCookie);

    try {
      if(!token){
        const res = await apiService.get<AuthResponse>(constants.API_AUTH, {});
        authCookie.serialize(JSON.stringify(res.access_token))
        timeStampCookie.serialize(String(Date.now()))
        return res
      }
    } catch (e) {
      console.error(e);
    }
  };