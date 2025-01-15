import { useEffect, useState } from "react"
import { Product } from "../@types"
import { numberFormat } from "../utils/numberFormat"
import Cookies from "js-cookie"

export interface PickupOrderProduct {
  product: Product
  quantity: number
  comments?: string
}

export type PickupOrder = Array<PickupOrderProduct>

const useOrder = () => {
  const [order, setOrder] = useState<PickupOrder>([] as PickupOrder)
  const [selectedFromOrder, setSelectedFromOrder] = useState<PickupOrderProduct | null>(null)

  useEffect(() => {
    const { business, branch } = getBusinessAndBranch()
    if (!business || !branch) {
      return
    }
    if (!order.length && Cookies.get(`${business}/${branch}/order`)) {
      const persistedOrder = JSON.parse(Cookies.get(`${business}/${branch}/order`)!)
      setOrder(persistedOrder)
      cleanOrdersFromOtherShops()
    }
  }, [])

  useEffect(() => {
    persistOrder()
  }, [order])

  const getBusinessAndBranch = () => {
    const validPath = window.location.pathname
      .trim()
      .split("/")
      .filter((param) => param)

    const business = validPath[0]
    const branch = validPath[1]

    return { business, branch }
  }

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

  const selectProductFromOrder = (param: string | null) => {
    if (!param) {
      setSelectedFromOrder(null)
    }

    setSelectedFromOrder(order.find((it) => it.product.id === param) || null)
  }

  const resetSelection = () => setSelectedFromOrder(null)

  const persistOrder = () => {
    const { business, branch } = getBusinessAndBranch()
    if (!business || !branch) {
      return
    }
    const existingCookie = Cookies.get(`${business}/${branch}/order`)
    if (existingCookie && JSON.parse(existingCookie!)?.length && !order.length) {
      return
    }
    Cookies.set(`${business}/${branch}/order`, JSON.stringify(order), {
      path: "/",
      domain: window.location.hostname,
      expires: 1
    })
  }

  // const removeOrderFromCookies = () => {
  //   const { business, branch} = getBusinessAndBranch();
  //   if(!business || !branch) return;

  //   Cookies.remove(encodeURIComponent(`${business}/${branch}/order`))
  // }

  const cleanOrdersFromOtherShops = () => {
    const { business, branch } = getBusinessAndBranch()
    const cookies = document.cookie.split(";")
    const cookiesKeys = cookies.map((cook) => cook.split("=")[0].trim())
    cookiesKeys.forEach((key) => {
      if (key.includes("order") && key !== encodeURIComponent(`${business}/${branch}/order`)) {
        Cookies.remove(encodeURIComponent(key), { path: "/", domain: window.location.hostname })
      }
    })
  }

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
