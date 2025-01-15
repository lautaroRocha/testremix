import axios, { AxiosResponse } from "axios"
import { NextFunction, Request } from "express"
import { config } from "../config"

export const branchesService = async (req: Request, next: NextFunction) => {
  const { authorization, tenant } = req.headers

  const axiosConfig = {
    method: "GET",
    url: config.api.baseURL + config.api.branches,
    headers: {
      accept: "*/*",
      "Content-Type": "application/text",
      Authorization: authorization,
      tenant: tenant
    }
  }
  try {
    const response = await axios.request(axiosConfig)
    return response.data
  } catch (e) {
    console.log(axiosConfig)
    req.headers.src = "branchesService"
    return next(e as unknown as AxiosResponse)
  }
}

export const getBranchByAlias = async (req: Request, next: NextFunction) => {
  const { authorization, tenant } = req.headers
  const { alias } = req.params

  const axiosConfig = {
    method: "GET",
    url: config.api.baseURL + config.api.branches + "/" + alias,
    headers: {
      accept: "*/*",
      "Content-Type": "application/text",
      Authorization: authorization,
      tenant: tenant
    }
  }
  try {
    const response = await axios.request(axiosConfig)
    return response.data
  } catch (e) {
    req.headers.src = "branchesService"
    return next(e as unknown as AxiosResponse)
  }
}
