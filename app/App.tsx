import { Dispatch, SetStateAction, createContext } from "react"
import { PickupOrder, PickupOrderProduct } from "./hooks/useOrder"

export const PickupContext = createContext({ isPickup: false })
interface OrderContext {
  order: PickupOrder
  setOrder: Dispatch<SetStateAction<PickupOrder>>
  isProductInOrder: (id: string) => boolean
  amountOfProductInOrder: (id: string) => number
  orderFullPrice: () => string
  productCommentsInOrder: (id: string) => string
  editProductQuantity: (id: string, quantity: number) => void
  removeProductFromOrder: (id: string) => void
  orderItemsAmount: () => number
  resetOrder: () => void
  selectProductFromOrder: (param: string | null) => void
  resetSelection: () => void
  selectedFromOrder: PickupOrderProduct | null
}

export const OrderContext = createContext({} as OrderContext)

