import style from "./branchBadge.module.css"
import addressIcon from "../../assets/adress.svg"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useParams } from "@remix-run/react"
import { useWindowSize } from "../../hooks/useWindowSize"
import { useAppSelector } from "../../redux/hooks"
import { BranchOffice } from "~/@types"

const BranchBadge = ({data}:{data?: BranchOffice}) => {
  const { business } = useParams()
  const { width } = useWindowSize()
  const { selected } = useAppSelector((state) => state.branch)

  if (!selected && !data) {
    return <Skeleton className={style.loadingBadge} />
  }

  const { branch_name, address, location } = selected ?? data
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
