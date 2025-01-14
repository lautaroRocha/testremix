import { useContext } from "react"
import { Product } from "../../@types"
import { numberFormat } from "../../utils/numberFormat"
import style from "./productCard.module.css"
import addIcon from "../../assets/add.svg"
import defaultImage from "../../assets/default.svg"
import * as LazyImage from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { useAppSelector } from "../../redux/hooks"
import { currencyFormat } from "../../utils/currencyFormat"
import { PickupContext, OrderContext } from "~/App"

export interface ProductCardProps {
  product: Product
  onClick: () => void
  isSelected: boolean
}

const {LazyLoadImage} = LazyImage

const ProductCard = ({ product, onClick, isSelected }: ProductCardProps) => {
  const { isPickup } = useContext(PickupContext)
  const { selected } = useAppSelector((state) => state.branch)

  return (
    <div
      className={`${style.productCard} ${isPickup ? style.pickup : ""} ${
        isSelected ? style.selected : ""
      }`}
      onClick={onClick}
    >
      <LazyLoadImage
        width={"100%"}
        height={5}
        src={product.image || defaultImage}
        onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
        placeholderSrc={defaultImage}
        effect="blur"
      />
      <h3>{product.product_name}</h3>
      <p>{product.description}</p>
      <span>{currencyFormat(numberFormat.format(product.price), selected?.currency_code)}</span>
      {isPickup ? <AddOrAdded id={product.id} /> : <></>}
    </div>
  )
}

export default ProductCard

const AddOrAdded = ({ id }: { id: string }) => {
  const { isPickup } = useContext(PickupContext)

  if (!isPickup) {
    return null
  }

  const orderContext = useContext(OrderContext)
  if (!orderContext) {
    return null
  }

  const { isProductInOrder, amountOfProductInOrder } = orderContext

  return (
    <div className={isProductInOrder && isProductInOrder(id) ? `${style.added}` : `${style.add}`}>
      {isProductInOrder && isProductInOrder(id) ? (
        amountOfProductInOrder(id)
      ) : (
        <img src={addIcon} draggable={false} />
      )}
    </div>
  )
}
