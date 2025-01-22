import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Dispatch, SetStateAction, createContext } from "react";
import useOrder, { PickupOrder, PickupOrderProduct } from "./hooks/useOrder";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "./i18n/i18n.server";
import { BrowserRouter } from "react-router";

export async function loader({ request }: any) {
  let locale = await i18next.getLocale(request);
  return locale;
}

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "translation",
};

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
  
  let locale = useLoaderData<typeof loader>();

  console.log(locale)

  let { i18n } = useTranslation();

  // This hook will change the i18n instanc    e language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);
  
  return (
    <Provider store={store}>
      <html lang={locale} dir={i18n.dir()}>        
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
