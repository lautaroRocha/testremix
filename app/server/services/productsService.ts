import axios, { AxiosResponse } from "axios"
import { NextFunction, Request } from "express"
import { config } from "../config"

export const productsService = async (req: Request, next: NextFunction) => {
  const { authorization, tenant, branchid } = req.headers
  const axiosConfig = {
    method: "GET",
    url: config.api.baseURL + config.api.products + "/" + branchid,
    headers: {
      accept: "*/*",
      Authorization: authorization,
      tenant: tenant
    }
  }
  try {
    const response = await axios.request(axiosConfig)
    return response.data
  } catch (e) {
    console.log(axiosConfig)
    req.headers.src = "productsService"
    return next(e as unknown as AxiosResponse)
  }
}
