import bodyParser from "body-parser"
import * as Sentry from "@sentry/node"
import express from "express"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"
import { config } from "./config/index"
import logger from "./loaders/logger"
import * as sentry from "./loaders/sentry"
import apiRouter from "./routes/api/index"
import sentryRouter from "./routes/sentry/index"
import { errorLogger } from "./middlewares/errorLogger"
import { environment } from "./config/constants"
import { banner } from "./config/banner"

const app = express()

sentry.load({ expressApp: app })

app.use(
  Sentry.Handlers.requestHandler({
    transaction: "handler"
  })
)

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.text({ limit: "200mb" }))
app.use(cors())

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "../../dist")))

app.use("/sentry", sentryRouter)
app.use("/api", apiRouter)
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"))
})

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())
app.use(errorLogger)
app
  .listen(config.app.port, () => {
    console.log(banner)
    logger.info(`Server listening on port: ${config.app.port}`)
    logger.info(`ENVIROMENT : ${JSON.stringify(environment, null, " ")}`)
    logger.info(`CONSTANTS: ${JSON.stringify(config, null, " ")}`)
  })
  .on("error", (err) => {
    logger.error(err)
    process.exit(1)
  })
