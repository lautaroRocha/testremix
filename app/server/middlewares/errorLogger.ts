import { AxiosError } from "axios"
import { NextFunction, Request, Response } from "express"
import logger from "../loaders/logger"

export const errorLogger = (
  error: AxiosError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { src } = req.headers
  logger.error(
    `Error on ${src || "unknown"} with method ${error.config ? error.config.method : "unknown"}: ${
      error.message
    }
    URL: ${error.config?.url}`
  )
  res.status(error.response ? error.response.status : 500).json({
    error: `Error on ${src || "unknown"} with method ${
      error.config ? error.config.method : "unknown"
    }: ${error.message}`
  })
}
