import axios, { AxiosResponse } from "axios"
import { NextFunction, Request } from "express"
import { config } from "../config"

export const productCategoriesService = async (req: Request, next: NextFunction) => {
  const { authorization, tenant } = req.headers
  try {
    const axiosConfig = {
      method: "GET",
      url: config.api.baseURL + config.api.categories,
      headers: {
        accept: "*/*",
        "Content-Type": "application/text",
        Authorization: authorization,
        tenant: tenant
      }
    }
    const response = await axios.request(axiosConfig)
    return response.data
  } catch (e) {
    req.headers.src = "productCategoriesService"
    return next(e as unknown as AxiosResponse)
  }
}
