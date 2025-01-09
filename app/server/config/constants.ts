import { config } from "dotenv"

config({})

export const VERSION = process.env.VITE_VERSION || "0.0.0"
export const PORT = process.env.VITE_SERVER_PORT || 8099
export const PUBLIC_URL = process.env.VITE_PUBLIC_URL || ""
export const SENTRY_DSN = process.env.VITE_SENTRY_DSN || ""
export const STAGE = process.env.VITE_STAGE || "testing"
export const BASE_URL = process.env.VITE_BASE_API || "https://ws-test.infosis.tech/gastronomix"
export const TENANT = process.env.VITE_TENANT || "/tenant"
export const BRANCHES = process.env.VITE_BRANCHES || "/branch-office"
export const PRODUCTS = process.env.VITE_PRODUCTS || "/product"
export const AUTH =
  process.env.VITE_AUTH ||
  "https://auth-test.infosis.tech/oauth/token?grant_type=client_credentials&"
export const REFRESH_AUTH =
  process.env.VITE_REFRESH_AUTH ||
  "https://auth-test.infosis.tech/oauth/token?grant_type=refresh_token&"
export const CLIENT_USER = process.env.VITE_AUTH_USER || "gastronomix"
export const CLIENT_PASSWORD = process.env.VITE_AUTH_PASSWORD || "infosis"
export const BASIC_TOKEN = process.env.VITE_BASIC_TOKEN || "Basic emV1czppbmZvc2lz"
export const CATEGORIES = process.env.VITE_CATEGORIES || "/product-category"

export const MP_ACCESS_KEY =
  process.env.VITE_MP_ACCESS_TOKEN ||
  "APP_USR-554455579188868-090409-22345911867fbf6806a040685551c625-1974687303"

export const environment = {
  BASE_URL,
  AUTH
}
