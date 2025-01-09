import { useEffect, useState } from "react"
import { BranchOffice, Product, ProductCategory } from "../../../@types"
import apiService from "../../../config/API"
import { constants } from "../../../config/constants"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { setSelectedBranch } from "../../../redux/slices/branchSlice"

const useProductAndCategories = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { isLogged, id } = useAppSelector((state) => state.tenant)
  const dispatch = useAppDispatch()
  const { branch } = useParams()

  const getProducts = async () => {
    const getBranches = async (): Promise<BranchOffice | undefined> => {
      try {
        const res = await apiService.get<any>(constants.API_BRANCHES + "/" + branch, {})
        dispatch(setSelectedBranch(res))
        return res
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    try {
      const branch = await getBranches()
      const branchId = branch ? branch.id : ""
      const res = await apiService.get<Product[]>(constants.API_PRODUCTS, {
        headers: { branchId: branchId }
      })
      setProducts(res)
    } catch (e) {
      console.error(e)
    }
  }

  const getCategories = async () => {
    try {
      const res = await apiService.get<ProductCategory[]>(constants.API_CATEGORIES, {})
      setCategories(categoriesWithProducts(res))
    } catch (e) {
      console.error(e)
    }
  }

  const orchestate = async () => {
    try {
      if (!products.length) {
        await getProducts()
      }
      if (products.length) {
        await getCategories()
      }
    } catch (e) {
      console.error(e)
    } finally {
      if (products.length && categories.length) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (isLogged && id) {
      orchestate()
    }
  }, [products, isLogged, id])

  const insertCategoryOnProduct = (): Product[] => {
    return products
      .filter((prod) => prod.category_id && prod.product_name)
      .map((prod) => ({
        ...prod,
        product_category: categories.find((cat) => cat.id === prod.category_id)!
      }))
  }

  const categoriesWithProducts = (data: ProductCategory[]) => {
    return data
      .filter((cat) => products.some((pro) => pro.category_id === cat.id))
      .sort((a, b) => a.category_name.localeCompare(b.category_name))
  }

  return {
    loading,
    products,
    categories,
    data: insertCategoryOnProduct().filter((prod) => prod !== undefined)
  }
}

export default useProductAndCategories
