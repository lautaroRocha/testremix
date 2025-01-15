import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Dispatch, SetStateAction, createContext } from "react";
import { PickupOrder, PickupOrderProduct } from "./hooks/useOrder";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap'
  }
];

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

export function Layout({ children }: { children: React.ReactNode }) {

  
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
            {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </Provider>
  );
}

export default function App() {
  return <Outlet />;
}
