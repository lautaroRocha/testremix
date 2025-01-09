import * as handleAuth from "../../../controllers/authController"
import { Application, Router } from "express"

const authRouter = Router()

authRouter.get("/", handleAuth.makeLogin as unknown as Application)

export default authRouter
