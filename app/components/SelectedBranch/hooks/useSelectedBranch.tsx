import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import apiService from "../../../config/API"
import { constants } from "../../../config/constants"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { setSelectedBranch } from "../../../redux/slices/branchSlice"
import Cookies from "js-cookie"
import { capitalizeWords } from "../../../utils/capitalize"

const useSelectedBranch = () => {
  const { branch, business } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const { isLogged, id } = useAppSelector((state) => state.tenant)
  const { selected } = useAppSelector((state) => state.branch)

  useEffect(() => {
    if (business && branch) {
      const favicon = document.querySelector("link[rel~='icon']")
      ;(favicon as HTMLAnchorElement).href = Cookies.get("image") || ""
      const titleTag = document.querySelector("title")
      ;(titleTag as HTMLTitleElement).textContent = `${capitalizeWords(
        business
      )} - ${capitalizeWords(branch.replaceAll("-", " "))}`
    }
  }, [branch, business])

  useEffect(() => {
    const getBranches = async () => {
      try {
        const res = await apiService.get<any>(constants.API_BRANCHES + "/" + branch, {})
        dispatch(setSelectedBranch(res))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    if (isLogged && id) {
      getBranches()
    }
  }, [isLogged, id])

  const goToMenu = () => {
    const titleTag = document.querySelector("title")
    if (titleTag) {
      ;(titleTag as HTMLTitleElement).textContent =
        business!.charAt(0).toUpperCase() + business!.slice(1)
      titleTag!.textContent = `${capitalizeWords(business || "")} - ${capitalizeWords(
        branch?.replaceAll("-", " ") || ""
      )} - Menú`
    }
    navigate(`/${business}/${branch}/menu`)
  }

  const goToPickup = () => {
    const titleTag = document.querySelector("title")
    if (titleTag) {
      ;(titleTag as HTMLTitleElement).textContent =
        business!.charAt(0).toUpperCase() + business!.slice(1)
      titleTag!.textContent = `${capitalizeWords(business || "")} - ${capitalizeWords(
        branch?.replaceAll("-", " ") || ""
      )} - Menú`
    }
    navigate(`/${business}/${branch}/pickup`)
  }

  return {
    selectedBranch: selected,
    business,
    loading,
    goToMenu,
    goToPickup
  }
}

export default useSelectedBranch
