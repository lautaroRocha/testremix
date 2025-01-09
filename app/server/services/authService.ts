import axios, { AxiosResponse } from "axios"
import { NextFunction, Request } from "express"
import { config } from "../config"
import logger from "../loaders/logger"

const authenticateUser = async (
  req: Request,
  next: NextFunction
): Promise<AxiosResponse | void> => {
  const axiosConfig = {
    method: "post",
    url: `${config.auth.baseURL}`,
    headers: {
      Authorization: config.auth.basic
    }
  }
  try {
    const response = await axios.request(axiosConfig)
    ///setting a very short TTL for testing
    //response.data.expires_in = 15
    return response
  } catch (e) {
    logger.error(axiosConfig.url)
    req.headers.src = "AuthService"
    return next(e as unknown as AxiosResponse)
  }
}

export default authenticateUser
