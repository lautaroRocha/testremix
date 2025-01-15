import { Product } from "../../@types"
import style from "./collapseList.module.css"
import productsIcon from "../../assets/products.svg"
import dropdownIcon from "../../assets/drop.svg"
import { numberFormat } from "../../utils/numberFormat"
import { useContext, useState } from "react"
import { OrderContext } from "../../App"
import { useTranslation } from "react-i18next"

export interface CollapseListProps {
  data: Product[]
}

const CollapseList = ({ data }: CollapseListProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { amountOfProductInOrder } = useContext(OrderContext)
  const { t } = useTranslation("orderDetail")

  return (
    <div className={`${style.collapseList} ${open ? style.open : ""}`}>
      <header>
        <img src={productsIcon} alt="" draggable={false} />
        <span>
          {data.length} {data.length > 1 ? t("collapseCountPlural") : t("collapseCountSingular")}
        </span>
        <button type="button" onClick={() => setOpen(!open)} id="collapseList-toggle-btn">
          <img src={dropdownIcon} alt="" draggable={false} />
        </button>
      </header>
      <ul>
        {data.map((prod) => (
          <ListItem key={prod.id} data={prod} amount={amountOfProductInOrder(prod.id)} />
        ))}
      </ul>
    </div>
  )
}

export default CollapseList

const ListItem = ({ data, amount }: { data: Product; amount: number }) => {
  const { image, product_name, price } = data

  return (
    <li>
      <img src={image} alt="" draggable={false} />
      <section>
        <h4>{product_name}</h4>
        <span>${numberFormat.format(price)}</span>
      </section>
      <p>{amount}</p>
    </li>
  )
}
