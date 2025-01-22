import * as en from "./en"
import * as es from "./es"

export default {
    supportedLngs: ["en", "es"],
    fallbackLng: "es",
    // The default namespace of i18next is "translation", but you can customize it here
    // defaultNS: "common",
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
  };