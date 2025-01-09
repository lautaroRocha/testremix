import style from "./branchBadge.module.css"
import addressIcon from "../../assets/adress.svg"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useParams } from "react-router-dom"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useAppSelector } from "../../redux/hooks"

const BranchBadge = () => {
  const { business } = useParams()
  const { width } = useWindowSize()
  const { selected } = useAppSelector((state) => state.branch)

  if (!selected) {
    return <Skeleton className={style.loadingBadge} />
  }

  const { branch_name, address, location } = selected
  const fullAddress = `${address}, ${location}`

  const MAX_CHARACTERS_ADDRESS = 40
  const DESKTOP_BREAKPOINT = 950
  const IS_IN_HEADER =
    window.location.pathname.includes("menu") || window.location.pathname.includes("pickup")
  const CSSCondition =
    fullAddress.length > MAX_CHARACTERS_ADDRESS &&
    width &&
    width < DESKTOP_BREAKPOINT &&
    IS_IN_HEADER

  return (
    <div className={`${style.branchBadge} ${CSSCondition ? style.wrapText : ""}`}>
      <h1>
        {business} {branch_name}
      </h1>
      <h2>
        <img src={addressIcon} alt="adress" draggable={false} />
        {fullAddress}
      </h2>
    </div>
  )
}

export default BranchBadge
