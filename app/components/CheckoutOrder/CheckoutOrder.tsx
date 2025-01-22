import { useParams } from "@remix-run/react"
import style from "./checkoutOrder.module.css"
import orderIllus from "../../assets/orderIllus.svg"
import { capitalizeWords } from "../../utils/capitalize"

const CheckoutOrder = () => {
  const { id, branch, business } = useParams()

  return (
    <div className={style.checkoutOrder}>
      <h3>
        ¡Tu pedido a {capitalizeWords(business || "")}{" "}
        {capitalizeWords(branch?.replaceAll("-", " ") || "")} fue realizado con éxito!{" "}
      </h3>
      <h4>Retiralo con el número de orden #{id}</h4>
      <img src={orderIllus} alt="" draggable={false} />
    </div>
  )
}

export default CheckoutOrder
