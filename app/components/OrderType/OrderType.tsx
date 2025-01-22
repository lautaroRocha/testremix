import style from "./orderType.module.css"
import { useParams } from "@remix-run/react"
import branchPickup from "../../assets/branch-pickup.svg"
import { useTranslation } from "react-i18next"
import { useWindowSize } from "../../hooks/useWindowSize"
import { BranchOffice} from "~/@types"

const MAX_ADDRESS_LENGTH = 70
const BLANK_SPACES = 4

const OrderType = ({branch}:{branch: BranchOffice}) => {
  const { business } = useParams()
  const { t } = useTranslation("orderDetail")
  const { address, location, branch_name } = branch
  const { width } = useWindowSize()

  const fullLocationText = business + branch_name + address + location

  return (
    <div
      className={style.orderType}
      style={{
        padding:
          width && width < 950 && fullLocationText.length + BLANK_SPACES > MAX_ADDRESS_LENGTH
            ? "7px"
            : ""
      }}
    >
      <img src={branchPickup} alt="" draggable={false} />
      <h2>{t("pickup")}</h2>
      <div>
        <span>{`${business} ${branch_name || ""}.`}</span> {`${address || ""}, ${location || ""}`}
      </div>
    </div>
  )
}

export default OrderType
