import logger from "../loaders/logger"
import { tenantService } from "../services/tenantService"
import { Request, Response, NextFunction } from "express"

const basicGet = (_req: Request, res: Response) => {
  res.json("tenant-route")
}

const tenantFetch = async (req: Request, res: Response, next: NextFunction) => {
  const response = await tenantService(req, next)
  if (response) {
    res.status(200).json(response)
    logger.info(`${req.method} request on tenant controller with status ${res.statusCode}`)
  } else {
    return
  }
}

export { basicGet, tenantFetch }
