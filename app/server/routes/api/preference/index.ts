import { Router } from "express"
import * as preferenceController from "../../../controllers/preferenceController"

const preferenceRouter = Router()

preferenceRouter.get("/", preferenceController.basicGet)

preferenceRouter.post("/", preferenceController.preferenceFetch)

export default preferenceRouter
