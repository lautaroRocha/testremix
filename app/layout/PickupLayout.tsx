import { Outlet } from "@remix-run/react";
import { OrderContext } from "~/App";
import useOrder from "~/hooks/useOrder";

export default function PickupLayout() {
  
  const contextValues = useOrder()

  return (
    <OrderContext.Provider value={{ ...contextValues }}>
      <Outlet />
    </OrderContext.Provider>
  );
}
