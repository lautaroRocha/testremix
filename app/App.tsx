import { Route, Routes } from "react-router-dom"
import {
  BranchSelector,
  BusinessSplash,
  Menu,
  OrderDetail,
  PaymentMethods,
  Pickup,
  SelectedBranch,
  CheckoutOrder,
  TenantSelector,
  WithProductsAndCategories
} from "./components"
import { withBackButton } from "./components/WithBackButton/WithBackButton"
import { Dispatch, SetStateAction, createContext } from "react"
import useIsPickup from "./hooks/useIsPickup"
import useOrder, { PickupOrder, PickupOrderProduct } from "./hooks/useOrder"
// import useAuth from "./hooks/useAuth"
import { useWindowSize } from "./hooks/useWindowSize"
import "./i18n/i18n"
import { constants } from "./config/constants"

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
  selectProductFromOrder: (param: string) => void
  resetSelection: () => void
  selectedFromOrder: PickupOrderProduct | null
}

export const OrderContext = createContext({} as OrderContext)

function App() {
  const isPickup = useIsPickup()
  const contextValues = useOrder()
  const { width } = useWindowSize()
  console.log(constants)
  // useAuth()

  return (
    <PickupContext.Provider
      value={{
        isPickup: isPickup
      }}
    >
      <OrderContext.Provider value={{ ...contextValues }}>
        <Routes>
          {/* <Route path="/" element={<TenantSelector />} /> */}
          <Route path="/:business" element={<BusinessSplash />}>
            <Route path="seleccionar-sucursal" element={<BranchSelector />} />
            <Route path=":branch">
              <Route path="" element={<SelectedBranch />} />
              <Route path="" element={<WithProductsAndCategories />}>
                <Route path="pickup" element={withBackButton(<Pickup />, true, true)} />
                <Route path="menu" element={withBackButton(<Menu />, true, true)} />
                <Route
                  path="mi-orden"
                  element={withBackButton(<OrderDetail />, false, Boolean(width && width > 925))}
                />
                <Route path="mi-orden/confirmar" element={withBackButton(<PaymentMethods />)} />
                <Route path="mi-orden/checkout/:id" element={<CheckoutOrder />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </OrderContext.Provider>
    </PickupContext.Provider>
  )
}

export default App
