import { productsService } from "../services/productsService"
import { Request, Response, NextFunction } from "express"

const basicGet = async (req: Request, res: Response, next: NextFunction) => {
  const response = await productsService(req, next)
  if (response) {
    res.status(200).json(response)
  } else {
    return
  }
}

export { basicGet }
