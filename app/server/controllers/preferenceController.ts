import { preferenceService } from "../services/preferenceService"
import { Request, Response, NextFunction } from "express"

const basicGet = (_req: Request, res: Response) => {
  res.json("preference-route")
}

const preferenceFetch = async (req: Request, res: Response, next: NextFunction) => {
  const response = await preferenceService(req, next)
  if (response) {
    res.status(200).json({ data: response })
  } else {
    return
  }
}

export { basicGet, preferenceFetch }
