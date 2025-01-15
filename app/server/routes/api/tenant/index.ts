import { Router } from "express"
import * as tenantController from "../../../controllers/tenantController"

const tenantRouter = Router()

tenantRouter.get("/", tenantController.tenantFetch)

export default tenantRouter
