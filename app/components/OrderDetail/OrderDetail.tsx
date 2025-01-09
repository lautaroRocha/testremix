import style from "./OrderDetail.module.css"
import { useContext } from "react"
import { OrderContext } from "../../App"
import orderIllustration from "../../assets/orderIllus.svg"
import {
  BranchBadge,
  Logo,
  OrderBrief,
  OrderProductCard,
  OrderType,
  PaymentMethods,
  ProductDetail
} from ".."
import orderIcon from "../../assets/order.svg"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../redux/hooks"
import { currencyFormat } from "../../utils/currencyFormat"

const OrderDetail = () => {
  const { order, orderItemsAmount, orderFullPrice, selectedFromOrder, resetSelection } =
    useContext(OrderContext)
  const { width } = useWindowSize()
  const navigate = useNavigate()
  const { business, branch } = useParams()
  const { selected } = useAppSelector((state) => state.branch)

  const { t } = useTranslation("orderDetail")

  if (!order.length) {
    navigate(`/${business}/${branch}/pickup`, { replace: true })
  }

  return (
    <div className={style.orderDetail}>
      {width && width > 925 ? (
        <header>
          <div className={style.headerLeft} />
          <div className={style.headerCenter} />
          <div className={style.headerRight} />
          <section>
            <Logo />
            <BranchBadge />
          </section>
        </header>
      ) : (
        <header>
          <img src={orderIcon} alt="" draggable={false} />
          <h1>{t("title")}</h1>
          <OrderType />
        </header>
      )}
      <main>
        {width && width > 925 ? <OrderType /> : null}
        <p>
          <h3>{t("brief")}</h3>
          <h3>
            {orderItemsAmount()} {t("items")}
          </h3>
        </p>
        {order.map((or, idx) => (
          <OrderProductCard
            key={or.product.id}
            product={or.product}
            quantity={or.quantity}
            idx={idx}
          />
        ))}
        {width && width > 925 ? (
          <p className={style.orderDetailBottom}>
            <span>{t("totalAmount")}</span>
            <span>{currencyFormat(orderFullPrice(), selected.currency_code)}</span>
          </p>
        ) : null}
      </main>
      {width && width > 950 && (
        <section className={style.orderPaymentSection}>
          <header>
            <h2>{t("callToAction")}</h2>
            <img src={orderIllustration} alt="your-order" draggable={false} />
          </header>
          <PaymentMethods />
        </section>
      )}
      {width && width < 950 && <OrderBrief />}
      {selectedFromOrder ? (
        <ProductDetail product={selectedFromOrder.product} reset={resetSelection} />
      ) : null}
    </div>
  )
}

export default OrderDetail
