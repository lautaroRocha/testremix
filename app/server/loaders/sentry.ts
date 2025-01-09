import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import { Application } from "express"
import { config } from "../config/index"
import logger from "./logger"

export const load = ({ expressApp }: { expressApp: Application }) => {
  Sentry.init({
    ...config.sentry,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app: expressApp })
    ],
    tracesSampleRate: 0.1
  })

  expressApp.use(Sentry.Handlers.requestHandler())
  expressApp.use(Sentry.Handlers.tracingHandler())

  logger.info("🧉️ Sentry loaded")
}
