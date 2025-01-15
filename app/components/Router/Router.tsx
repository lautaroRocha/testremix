import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import { ReactNode } from "react"

const Router = () => {
  return (
    <Routes>
      <Route path="/:tenant">
        {ROUTES.map((route) => (
          <Route path={route.path} element={route.element as ReactNode} key={route.path} />
        ))}
      </Route>
    </Routes>
  )
}

export default Router
