import i18n from "i18next"
import * as en from "./en"
import * as es from "./es"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: {
      order: [
        "navigator",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "path",
        "subdomain"
      ]
    },
    debug: false, //NEVER DEPLOY WITH DEBUG SETTED TO TRUE
    fallbackLng: "es",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        /// ADD EN NAMESPACES
        tenantSelector: en.tenantSelector,
        orderDetail: en.orderDetail,
        orderBrief: en.orderBrief,
        productDetail: en.productDetail,
        withBackButton: en.withBackButton,
        categorySection: en.categorySection,
        notFound: en.notFound,
        menu: en.menu,
        selectedBranch: en.selectedBranch,
        splash: en.splash,
        branchSelector: en.branchSelector
      },
      es: {
        /// ADD ES NAMESPACES
        tenantSelector: es.tenantSelector,
        orderDetail: es.orderDetail,
        orderBrief: es.orderBrief,
        productDetail: es.productDetail,
        withBackButton: es.withBackButton,
        categorySection: es.categorySection,
        notFound: es.notFound,
        menu: es.menu,
        selectedBranch: es.selectedBranch,
        splash: es.splash,
        branchSelector: es.branchSelector
      }
    }
  })

export default i18n
