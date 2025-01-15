import axios, { AxiosResponse } from "axios"
import { config } from "../config"

const refreshURL = (refresh: string) =>
  `${config.auth.refreshURL}refresh_token=${refresh}&username&gastronomix&password=infosis`

const refreshToken = async (refresh: string): Promise<AxiosResponse> => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: refreshURL(refresh)
  }
  try {
    const response = await axios.request(config)
    return response
  } catch (error) {
    return error as AxiosResponse
  }
}

export default refreshToken
