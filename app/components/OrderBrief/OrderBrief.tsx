import { useContext, useState } from "react"
import style from "./orderBrief.module.css"
import { OrderContext } from "../../App"
import orderIcon from "../../assets/order.svg"
import productsIcon from "../../assets/products.svg"
import { useNavigate, useParams } from "@remix-run/react"
import arrowIcon from "../../assets/brancharrow.svg"
import trayIcon from "../../assets/tray.svg"
import trashIcon from "../../assets/delete.svg"
import addIcon from "../../assets/add.svg"
import { CollapseList, OrderProductCard, OrderType } from ".."
import { useWindowSize } from "../../hooks/useWindowSize"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../redux/hooks"
import { currencyFormat } from "../../utils/currencyFormat"
import { BranchOffice } from "~/@types"

const OrderBrief = ({branchData}:{branchData: BranchOffice}) => {
  const { orderFullPrice, order } = useContext(OrderContext)

  const navigate = useNavigate()
  const { business, branch } = useParams()
  const { selected } = useAppSelector((state) => state.branch)

  const { width } = useWindowSize()

  const { t } = useTranslation("orderBrief")

  const IS_ORDER_DETAIL = window.location.pathname.includes("mi-orden")
  const IS_PAYMENT_METHODS = window.location.pathname.includes("mi-orden/confirmar")

  const returnToPickup = () => navigate(`/${business}/${branch}/pickup`)

  const goToPaymentMethods = () => navigate(`/${business}/${branch}/pickup/mi-orden/confirmar`)

  const goToOrder = () => navigate(`/${business}/${branch}/pickup/mi-orden`)

  const {currency_code} = selected ?? branchData

  if (width && width >= 950) {
    return <DesktopOrderBrief goToOrder={goToOrder} branchData={branchData}/>
  }

  return (
    <div className={style.orderBrief}>
      <header>
        <span>{t("totalAmount")}</span>
        <span>{currencyFormat(orderFullPrice(), currency_code)}</span>
      </header>
      {IS_PAYMENT_METHODS ? (
        <div className={style.paymentMethodBrief}>
          <header className={style.paymentMethodBriefHeader}>
            <img src={orderIcon} alt="" draggable={false} />
            <h2>{t("title")}</h2>
          </header>
          <OrderType branch={branchData}/>
          <CollapseList data={order?.map((or) => or.product)} />
        </div>
      ) : IS_ORDER_DETAIL ? (
        <>
          <footer className={style.detailFooter}>
            <button onClick={returnToPickup} id="orderBrief-return-btn">
              <img src={addIcon} alt="" draggable={false} />
              {t("add")}
            </button>
            <button onClick={goToPaymentMethods} id="orderBrief-continue-btn">
              {t("continue")}
              <img src={arrowIcon} alt="" draggable={false} />
            </button>
          </footer>
        </>
      ) : (
        <footer>
          <span>
            <img src={productsIcon} alt="" draggable={false} />
            {order.length} {t("products")}
          </span>
          <button onClick={goToOrder} id="orderBrief-goToOrder-btn">
            <img src={orderIcon} alt="" draggable={false} />
            {t("checkOrder")}
          </button>
        </footer>
      )}
    </div>
  )
}

export default OrderBrief

const DesktopOrderBrief = ({ goToOrder, branchData}: { goToOrder: () => void, branchData: BranchOffice }) => {
  const { order, orderFullPrice, resetOrder } = useContext(OrderContext)
  const { selected } = useAppSelector((state) => state.branch)

  const [fullyOpen, setFullyOpen] = useState<boolean>(
    window.location.pathname.includes("pickup") ? true : false
  )

  const { t } = useTranslation("orderBrief")

  const {currency_code} = selected ?? branchData


  return (
    <div
      className={`${style.desktopOrderBrief} ${order.length ? style.open : ""} ${
        fullyOpen ? style.fullyOpen : style.notFullyOpen
      }`}
    >
      <header
        onClick={() => {
          setFullyOpen(!fullyOpen)
        }}
      >
        <img src={trayIcon} alt="" draggable={false} />
        <h2>{t("title")}</h2>
        <span>
          {order.length} {t("items")}
        </span>
      </header>
      <div>
        {order.map((or, idx) => (
          <OrderProductCard
            key={or.product.id}
            product={or.product}
            quantity={or.quantity}
            idx={idx}
            currencyCode={currency_code}
          />
        ))}
      </div>
      <footer>
        <div>
          <span>{t("totalAmount")}</span>
          <span>{currencyFormat(orderFullPrice(), currency_code)}</span>
        </div>
        <div>
          <button onClick={resetOrder} id="orderBrief-reset-btn">
            <img src={trashIcon} alt="delete-order" draggable={false} />
            {t("clean")}
          </button>
          <button
            id="orderBrief-continue-btn"
            onClick={() => {
              goToOrder()
              setFullyOpen(false)
            }}
          >
            {t("continue")}
            <img src={arrowIcon} alt="" draggable={false} />
          </button>
        </div>
      </footer>
    </div>
  )
}
