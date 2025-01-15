import { Router } from "express"
import * as versionController from "../../../controllers/versionController"

const versionRouter = Router()

versionRouter.get("/", versionController.getVersion)

export default versionRouter
