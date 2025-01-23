import { BranchOffice, Product } from "../../@types"
import { numberFormat } from "../../utils/numberFormat"
import style from "./productDetail.module.css"
import backArrow from "/assets/back.svg"
import crossIcon from "/assets/cross.svg"
import { useContext, useEffect, useState, useRef } from "react"
import foodIcon from "/assets/food.svg"
import { PickupContext } from "../../App"
import { ProductPickupForm } from ".."
import defaultImage from "/assets/default.svg"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../redux/hooks"
import { currencyFormat } from "../../utils/currencyFormat"

export interface ProductDetailProps {
  product: Product | null
  reset: () => void
  branch?: BranchOffice
}

const ProductDetail = ({ product, reset, branch }: ProductDetailProps) => {
  const [active, setActive] = useState<boolean>(false)
  const [animate, setAnimate] = useState<boolean>(false)

  const [yOffset, setYOffset] = useState<number>(0)
  const [originalOverlayColor, setOriginalOverlayColor] = useState<string>("")

  const { selected } = useAppSelector((state) => state.branch)

  const {currency_code} = branch ?? selected

  const isPickup = window.location.pathname.includes("pickup")

  const { t } = useTranslation(["productDetail", "categorySection"])

  const overlayRef = useRef<HTMLDivElement>(null)

  const isOrder = window.location.pathname.includes("mi-orden")

  useEffect(() => {
    if (product) {
      setTimeout(() => {
        setActive(true)
      }, 100)
    }

    return () => setActive(false)
  }, [product])

  if (!product) {
    return
  }

  const handleBack = () => {
    setAnimate(true)
    setTimeout(() => {
      reset()
      setAnimate(false)
      setYOffset(0)
    }, 250)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentY = e.touches[0].clientY

    const offset = currentY - window.innerHeight / 2
    if (offset > -15) {
      setYOffset(offset)
    }
    handleOverlayColor(offset)
  }

  const handleOverlayColor = (offset: number) => {
    if (overlayRef.current) {
      const overlayStyle = window.getComputedStyle(overlayRef.current)
      const overlayColor = overlayStyle.backgroundColor
      if (!originalOverlayColor) {
        setOriginalOverlayColor(overlayColor)
      }
      const colorParts = overlayColor.replace("rgba(", "").replace(")", "").split(",")
      const r = colorParts[0].trim()
      const g = colorParts[1].trim()
      const b = colorParts[2].trim()
      const originalAlpha = 0.5
      const maxScroll = 350
      const newAlpha = Math.min(
        Math.max(0, originalAlpha - (offset / maxScroll) * originalAlpha),
        originalAlpha
      )
      const newColor = `rgba(${r}, ${g}, ${b}, ${newAlpha})`
      overlayRef.current.style.backgroundColor = newColor
    }
  }

  const handleTouchEnd = () => {
    if (yOffset > 180) {
      handleBack()
    } else {
      setYOffset(0)
      if (overlayRef.current) {
        overlayRef.current.style.backgroundColor = originalOverlayColor
      }
    }
  }

  return (
    <div
      ref={overlayRef}
      className={`${style.productDetail} ${active ? style.active : ""} ${
        isPickup ? style.pickup : ""
      } ${animate ? style.animateDown : ""}`}
      onClick={handleBack}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          top: yOffset
        }}
      >
        <button type="button" onClick={handleBack} id="productDetail-goBack-btn">
          <img src={backArrow} alt="go back" draggable={false} />
        </button>
        <header>
          {t("title")}
          <button type="button" onClick={handleBack} id="productDetail-close-btn">
            <img src={crossIcon} alt="closedetail" draggable={false} />
          </button>
        </header>
        <img
          src={product.image || defaultImage}
          onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
          alt="product image"
          draggable={false}
        />
        <div>
          <header>
            {product?.favorite ? (
              <span>
                <span className={style.imgDrop}></span>
                <img src={foodIcon} draggable={false} />
                <label>{t("favLabel", { ns: "categorySection" })}</label>
              </span>
            ) : (
              <></>
            )}
            <span>
              <span className={style.imgDrop}></span>
              <img src={foodIcon} draggable={false} />
              <label>{product?.product_category?.category_name}</label>
            </span>
          </header>
          <h3>{product?.product_name}</h3>
          <p>{product?.description}</p>
          {(isPickup || isOrder) && product ? (
            <ProductPickupForm product={product} onSubmit={handleBack} branch={branch!} />
          ) : (
            <span>
              {currencyFormat(
                numberFormat.format(product.price || 0) || 0.0,
                currency_code
              )}
            </span>
          )}
        </div>
      </article>
    </div>
  )
}

export default ProductDetail
