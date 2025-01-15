import * as constants from "./constants"

export const config = {
  app: {
    version: constants.VERSION,
    port: constants.PORT,
    publicUrl: constants.PUBLIC_URL,
    stage: constants.STAGE
  },
  sentry: {
    dsn: constants.SENTRY_DSN,
    release: constants.VERSION,
    environment: constants.STAGE
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  api: {
    baseURL: constants.BASE_URL,
    tenant: constants.TENANT,
    branches: constants.BRANCHES,
    products: constants.PRODUCTS,
    categories: constants.CATEGORIES
  },
  auth: {
    baseURL: constants.AUTH,
    refreshURL: constants.REFRESH_AUTH,
    user: constants.CLIENT_USER,
    pass: constants.CLIENT_PASSWORD,
    basic: constants.BASIC_TOKEN
  },
  mercadoPago: {
    accessToken: constants.MP_ACCESS_KEY
  }
}
