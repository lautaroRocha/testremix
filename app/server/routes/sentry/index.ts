import * as express from "express"

const route = express.Router()

route.get("/", (_req, res, _next) => {
  res.json("sentry")
})

route.get("/debug", (_req, _res, _next) => {
  throw new Error("My first Sentry error!")
})

export default route
