export const constants = {
  API_BASE_URL: import.meta.env.VITE_EXPRESS || "/api",
  API_AUTH: import.meta.env.VITE_EXPRESS_AUTH || "/auth",
  API_BUSINESS: import.meta.env.VITE_EXPRESS_BUSINESS || "/tenant",
  API_BRANCHES: import.meta.env.VITE_EXPRESS_BRANCHES || "/branches",
  API_PRODUCTS: import.meta.env.VITE_EXPRESS_PRODUCTS || "/products",
  API_CATEGORIES: import.meta.env.VITE_EXPRESS_PRODUCTS_CATEGORY || "/productCategories",
  MP_PUBLICK_KEY:
    import.meta.env.VITE_MP_PUBLIC_KEY || "APP_USR-3c991ab7-f103-4017-ad7f-37908d6edc50",
  GLOBAL_PAYMENTS_ENV: import.meta.env.GLOBAL_PAYMENTS_ENV || "sandbox"
}
