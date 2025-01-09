import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const PICKUP_ROUTES = ["pickup", "mi-orden"]

const useIsPickup = () => {
  const location = useLocation()
  const [isPickup, setIsPickup] = useState<boolean>(
    PICKUP_ROUTES.some((route) => window.location.pathname.includes(route))
  )

  useEffect(() => {
    setIsPickup(PICKUP_ROUTES.some((route) => window.location.pathname.includes(route)))
  }, [location])

  return isPickup
}

export default useIsPickup
