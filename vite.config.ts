import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "pages/MainPage.tsx", { index: true });
          route("/empresas", "pages/TenantsPage.tsx");
          route(":business", "pages/TenantSplashPage.tsx");
          route(":business/seleccionar-sucursal", "pages/SelectBranchPage.tsx");
          route(":business/:branch", "pages/SelectedBranchPage.tsx");
          route(":business/:branch/menu", "pages/MenuPage.tsx");
          route(":business/:branch/pickup", "pages/PickupPage.tsx");
          });
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
