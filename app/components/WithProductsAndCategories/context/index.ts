import { createContext } from "react"
import { Product, ProductCategory } from "../../../@types"

export const ProductsContext = createContext({ data: [] as Product[] })
export const CategoriesContext = createContext({ categories: [] as ProductCategory[] })
