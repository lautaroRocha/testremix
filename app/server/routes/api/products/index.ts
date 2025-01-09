import { Router } from "express"
import * as productsController from "../../../controllers/productsController"

const productsRouter = Router()

productsRouter.get("/", productsController.basicGet)

export default productsRouter
