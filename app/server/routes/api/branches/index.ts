import { Router } from "express"
import * as branchesController from "../../../controllers/branchesController"

const branchesRouter = Router()

branchesRouter.get("/", branchesController.branchesFetch)
branchesRouter.get("/:alias", branchesController.branchByAlias)

export default branchesRouter
