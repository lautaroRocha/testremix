import { useState } from "react"
import { Product } from "../@types"
import { numberFormat } from "../utils/numberFormat"

export interface PickupOrderProduct {
  product: Product
  quantity: number
  comments?: string
}

export type PickupOrder = Array<PickupOrderProduct>

const useOrder = () => {
  const [order, setOrder] = useState<PickupOrder>([] as PickupOrder)
  const [selectedFromOrder, setSelectedFromOrder] = useState<PickupOrderProduct | null>(null)

  const isProductInOrder = (id: string): boolean => {
    return order.some((pickup) => pickup.product.id === id)
  }

  const amountOfProductInOrder = (id: string): number => {
    return order.find((pickup) => pickup.product.id === id)?.quantity || 0
  }

  const orderFullPrice = (): string => {
    return numberFormat.format(
      order.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    )
  }

  const orderItemsAmount = (): number => {
    return order.reduce((acc, item) => acc + item.quantity, 0)
  }

  const productCommentsInOrder = (id: string): string => {
    return order.find((pickup) => pickup.product.id === id)?.comments || ""
  }

  const editProductQuantity = (id: string, quantity: number) => {
    setOrder((cur) => {
      const current = [...cur]
      const indexToEdit = current.findIndex((or) => or.product.id === id)
      if (indexToEdit !== -1) {
        const toEdit = { ...current[indexToEdit], quantity: quantity }
        current[indexToEdit] = toEdit
      }
      return current
    })
  }

  const removeProductFromOrder = (id: string) => {
    setOrder((cur) => {
      const current = [...cur]
      const indexToRemove = current.findIndex((or) => or.product.id === id)
      if (indexToRemove !== -1) {
        current.splice(indexToRemove, 1)
      }
      return current
    })
  }

  const resetOrder = () => {
    setOrder([])
  }

  const selectProductFromOrder = (param: string) =>
    setSelectedFromOrder(order.find((it) => it.product.id === param) || null)

  const resetSelection = () => setSelectedFromOrder(null)

  const contextValues = {
    order,
    setOrder,
    isProductInOrder,
    amountOfProductInOrder,
    orderFullPrice,
    productCommentsInOrder,
    editProductQuantity,
    removeProductFromOrder,
    orderItemsAmount,
    resetOrder,
    selectProductFromOrder,
    resetSelection,
    selectedFromOrder
  }

  return contextValues
}

export default useOrder
