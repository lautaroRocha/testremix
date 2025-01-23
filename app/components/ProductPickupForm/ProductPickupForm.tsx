import { useContext, useEffect, useState } from "react"
import { BranchOffice, Product } from "../../@types"
import style from "./productPickupForm.module.css"
import addIcon from "/assets/add.svg"
import { numberFormat } from "../../utils/numberFormat"
import { OrderContext } from "../../App"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../redux/hooks"
import { currencyFormat } from "../../utils/currencyFormat"

export interface ProductPickupFormProps {
  product: Product
  onSubmit: () => void
  branch: BranchOffice
}

const ProductPickupForm = ({ product, onSubmit, branch }: ProductPickupFormProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [comment, setComment] = useState<string>("")

  const { selected } = useAppSelector((state) => state.branch)

  const { t } = useTranslation("productDetail")

  const { setOrder, isProductInOrder, amountOfProductInOrder, order, productCommentsInOrder } =
    useContext(OrderContext)

  useEffect(() => {
    return () => setQuantity(1)
  }, [])

  // useEffect(() => {
  //   if (isProductInOrder(product.id)) {
  //     setQuantity(amountOfProductInOrder(product.id))
  //     setComment(productCommentsInOrder(product.id))
  //   }
  // }, [product])

  const addToOrder = () => {
    if (isProductInOrder(product.id)) {
      const current = [...order]
      const thisProduct = current.find((order) => order.product.id === product.id)
      thisProduct!.quantity = quantity
      thisProduct!.comments = comment
      setOrder(current)
    } else {
      setOrder((cur) => [...cur, { product: product, quantity: quantity, comments: comment }])
    }
    onSubmit()
  }

  const isOrder = window.location.pathname.includes("mi-orden")

  const {currency_code} = selected ?? branch

  return (
    <div className={style.productPickupForm}>
      <label htmlFor="comment">
        {t("form.title")}
        <textarea
          name="comment"
          id=""
          placeholder={t("form.placeholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <div className={style.productPickupFormControls}>
        <div>
          <button
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
            id="productPickupForm-less-btn"
          >
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} id="productPickupForm-more-btn">
            +
          </button>
        </div>
        <span>{currencyFormat(numberFormat.format(product.price), currency_code)}</span>
      </div>
      <button type="button" id="pickup-btn-addToOrder" onClick={addToOrder}>
        {isOrder ? null : <img src={addIcon} draggable={false} />}
        {isOrder ? t("form.confirmButton") : t("form.button")}
      </button>
    </div>
  )
}

export default ProductPickupForm
