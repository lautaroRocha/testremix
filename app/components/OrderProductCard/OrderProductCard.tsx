import { CurrencyISO, Product } from "../../@types"
import { numberFormat } from "../../utils/numberFormat"
import style from "./orderProductCard.module.css"
import editIcon from "../../assets/edit.svg"
import deleteIcon from "../../assets/delete.svg"
import { useContext } from "react"
import { OrderContext } from "../../App"
import defaultImage from "../../assets/default.svg"
import { useAppSelector } from "../../redux/hooks"
import { currencyFormat } from "../../utils/currencyFormat"

export interface OrderProductCardProps {
  product: Product
  quantity: number
  idx: number
  currencyCode?: CurrencyISO
}

const OrderProductCard = ({ product, quantity, idx, currencyCode }: OrderProductCardProps) => {
  const { product_name, price, image, id } = product

  const { selected } = useAppSelector((state) => state.branch)

  const { editProductQuantity, removeProductFromOrder, selectProductFromOrder } =
    useContext(OrderContext)

  const currency_code = selected?.currency_code ?? currencyCode

  return (
    <div className={style.orderProductCard}>
      <img
        src={image || defaultImage}
        onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
        alt=""
        draggable={false}
      />
      <div>
        <h5>{product_name}</h5>
        <div className={style.quantityControl}>
          <button
            onClick={() => editProductQuantity(id, quantity - 1)}
            disabled={quantity === 1}
            id={`orderProductCard-less-btn-${idx}`}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => editProductQuantity(id, quantity + 1)}
            id={`orderProductCard-more-btn-${idx}`}
          >
            +
          </button>
        </div>
      </div>
      <div className={style.actions}>
        <button id={`orderProductCard-edit-btn-${idx}`} onClick={() => selectProductFromOrder(id)}>
          <img src={editIcon} alt="" draggable={false} />
        </button>
        <button
          onClick={() => removeProductFromOrder(id)}
          id={`orderProductCard-remove-btn-${idx}`}
        >
          <img src={deleteIcon} alt="" draggable={false} />
        </button>
      </div>
      <span>{currencyFormat(numberFormat.format(price), currency_code)}</span>
    </div>
  )
}

export default OrderProductCard
