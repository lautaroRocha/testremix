import { Outlet } from "@remix-run/react"
import useProductAndCategories from "./hooks/useProductsAndCategories"
import { CategoriesContext, ProductsContext } from "./context"

const WithProductsAndCategories = () => {
  const { data, categories } = useProductAndCategories()

  return (
    <ProductsContext.Provider value={{ data: data }}>
      <CategoriesContext.Provider value={{ categories: categories }}>
        <Outlet />
      </CategoriesContext.Provider>
    </ProductsContext.Provider>
  )
}

export default WithProductsAndCategories
