import { productCategoriesService } from "../services/productCategoriesService"
import { Request, Response, NextFunction } from "express"

const getProductCategories = async (req: Request, res: Response, next: NextFunction) => {
  const response = await productCategoriesService(req, next)
  if (response) {
    res.status(200).json(response)
  } else {
    return
  }
}

export { getProductCategories }
