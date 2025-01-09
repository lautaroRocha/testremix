import { Router } from "express"
import * as productCategoriesController from "../../../controllers/productCategoriesController"

const productCategoriesRouter = Router()

productCategoriesRouter.get("/", productCategoriesController.getProductCategories)

export default productCategoriesRouter
