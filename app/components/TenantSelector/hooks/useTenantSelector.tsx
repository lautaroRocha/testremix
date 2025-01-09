import { useEffect, useState } from "react"
import { Tenant } from "../../../@types"
import { useNavigate } from "react-router-dom"
import { capitalizeWords } from "../../../utils/capitalize"

const useTenantSelector = (data: Tenant[] | undefined) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [tenants, setTenants] = useState<Tenant[]>(data ? data : [])
  const [originalTenants, setOriginalTenants] = useState<Tenant[]>(data ? data : [])
  const [selected, setSelected] = useState<Tenant | null>(null)
  const [query, setQuery] = useState<string>("")
  const navigate = useNavigate()


  useEffect(() => {
    if(data?.length){
      setLoading(false)
      setOriginalTenants(data)
    }
  }, [data])

  useEffect(() => {
    if (!query) {
      setTenants(originalTenants)
    } else {
      setTenants(originalTenants.filter((tnt) => tnt.alias.toLowerCase().includes(query)))
    }
  }, [query])

  const handleSearch = (param: string) => {
    setQuery(param.trim().toLowerCase())
  }

  const isSelected = (id: string) => {
    return selected?.id === id
  }

  const confirmTenant = (tnt: Tenant) => {
    const titleTag = document.querySelector("title")
    if (titleTag) {
      titleTag.textContent = capitalizeWords(tnt.alias)
    }
    navigate(`/${tnt.alias.trim().toLowerCase()}`)
  }

  return {
    loading,
    tenants,
    selected,
    setSelected,
    query,
    handleSearch,
    isSelected,
    confirmTenant
  }
}

export default useTenantSelector
