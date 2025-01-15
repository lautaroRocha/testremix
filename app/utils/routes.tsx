import { ReactNode } from "react"
import FirstRouteContent from "./examples/FirstRouteContent"
import SecondRouteContent from "./examples/SecondRouteContent"
import ThirdRouteContent from "./examples/ThirdRouteContent"
import { icon1, icon2, icon3 } from "./assets"

export interface RouteData {
  path: string
  element: ReactNode
  icon: any
}

export const ROUTES: Array<RouteData> = [
  { path: "/", element: <FirstRouteContent />, icon: icon1 },
  { path: "/2", element: <SecondRouteContent />, icon: icon2 },
  { path: "/3", element: <ThirdRouteContent />, icon: icon3 }
]
