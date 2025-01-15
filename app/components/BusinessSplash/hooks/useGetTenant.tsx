import { useEffect, useState } from "react"
import apiService from "../../../config/API"
import { constants } from "../../../config/constants"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { reset, setTenant } from "../../../redux/slices/tenantSlice"
import Cookies from "js-cookie"
import { resetUserData } from "../../../redux/slices/userSlice"
import { capitalizeWords } from "../../../utils/capitalize"

interface TenantResponse {
  id: string
  image: string
}

const useGetTenant = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [notInSplash, setNotInSplash] = useState<boolean>(false)

  
  const dispatch = useAppDispatch()
  const { business } = useParams()
  
  useEffect(() => {
    dispatch(reset())
  }, [])
  
  useEffect(() => {
    if (Cookies.get("alias") && Cookies.get("alias") !== business) {
      const NOT_IN_SPLASH = window.location.pathname.split("/").length > 2
      setNotInSplash(NOT_IN_SPLASH)
      const cookies = document.cookie.split(";")
      const cookiesKeys = cookies.map((cook) => cook.split("=")[0].trim())
      cookiesKeys.forEach((key) => Cookies.remove(key))
      dispatch(resetUserData())
      window.location.reload()
    }
  }, [])

  const getTenant = async () => {
    try {
      const res = await apiService.get<TenantResponse>(constants.API_BUSINESS, {
        headers: { alias: business }
      })
      dispatch(setTenant(res))
      Cookies.set("tenant", res.id)
      Cookies.set("image", res.image)
      Cookies.set("alias", business!)
      if (!notInSplash) {
        // const favicon = document.querySelector("link[rel~='icon']");
        // (favicon as HTMLAnchorElement).href = res.image
        const titleTag = document.querySelector("title")
        ;(titleTag as HTMLTitleElement).textContent = capitalizeWords(business || "")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  const { isLogged } = useAppSelector((state) => state.tenant)

  useEffect(() => {
    if (isLogged && business) {
      getTenant()
    } else {
      setLoading(false)
    }
  }, [isLogged])

  return { loading }
}

export default useGetTenant
