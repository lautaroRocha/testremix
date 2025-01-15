import { Router, Request, Response } from "express"
import authRouter from "./auth"
//ROUTES IMPORTS
import versionRouter from "./version"
import preferenceRouter from "./preference"
import productCategoriesRouter from "./productCategories"
import productsRouter from "./products"
import branchesRouter from "./branches"
import tenantRouter from "./tenant"
import isTokenValid from "../../middlewares/isTokenValid"

const apiRouter = Router()

apiRouter.get("/", (_req: Request, res: Response) => {
  res.send("Hello world!")
})

//ADD ROUTES
apiRouter.use("/version", versionRouter)
apiRouter.use("/preference", preferenceRouter)
apiRouter.use("/productCategories", isTokenValid, productCategoriesRouter)
apiRouter.use("/products", isTokenValid, productsRouter)
apiRouter.use("/branches", isTokenValid, branchesRouter)
apiRouter.use("/tenant", isTokenValid, tenantRouter)
apiRouter.use("/auth", authRouter)

export default apiRouter
