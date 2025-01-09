import { useEffect, useState } from "react"
import { BranchOffice } from "../../../@types"
import { useNavigate, useParams } from "react-router-dom"
// import apiService from "../../../config/API"
// import { constants } from "../../../config/constants"
// import { useAppSelector } from "../../../redux/hooks"
import { capitalizeWords } from "../../../utils/capitalize"
// import Cookies from "js-cookie"

const useBranchSelector = (data: BranchOffice[]) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [branches, setBranches] = useState<BranchOffice[]>(data)
  const [selected, setSelected] = useState<BranchOffice | null>(null)
  const [query, setQuery] = useState<string>("")
  const navigate = useNavigate()
  const { business } = useParams()

  useEffect(() => {
    if (business) {
      //const favicon = document.querySelector("link[rel~='icon']")
      ;
      // (favicon as HTMLAnchorElement).href = Cookies.get("image") || ""
      const titleTag = document.querySelector("title")
      ;(titleTag as HTMLTitleElement).textContent = `${capitalizeWords(business)}`
    }
  }, [business])

  useEffect(() => {
    if(data?.length){
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (!query) {
      setBranches(data)
    } else {
      debugger;
      setBranches(
        data.filter((branch) => branch.branch_name.toLowerCase().includes(query))
      )
    }
  }, [query])

  const handleSearch = (param: string) => {
    setQuery(param.trim().toLowerCase())
  }

  const isSelected = (id: string) => {
    return selected?.id === id
  }

  const confirmBranch = (branch: BranchOffice) => {
    const titleTag = document.querySelector("title")
    if (titleTag) {
      titleTag.textContent = `${capitalizeWords(business || "")} - ${branch.branch_name}`
    }
    navigate(`/${business}/${branch.branch_name.toLowerCase().replaceAll(" ", "-")}`)
  }

  return {
    loading,
    branches,
    selected,
    setSelected,
    query,
    handleSearch,
    isSelected,
    confirmBranch
  }
}

export default useBranchSelector
