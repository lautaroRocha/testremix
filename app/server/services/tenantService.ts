import axios, { AxiosResponse } from "axios"
import { NextFunction, Request } from "express"
import { config } from "../config"

export const tenantService = async (req: Request, next: NextFunction) => {
  const { authorization, alias } = req.headers
  try {
    const axiosConfig = {
      method: "GET",
      url: config.api.baseURL + config.api.tenant + (alias ? `/${alias}` : ""),
      headers: {
        accept: "*/*",
        "Content-Type": "application/text",
        Authorization: authorization
      }
    }
    const response = await axios.request(axiosConfig)
    return response.data
  } catch (e) {
    req.headers.src = "tenantService" ///add a header with the service name to track the error
    return next(e as unknown as AxiosResponse)
  }
}
