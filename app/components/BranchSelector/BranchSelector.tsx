import style from "./BranchSelector.module.css"
import { BranchOffice } from "../../@types"
import menuIcon from "/assets/menu.svg"
import pickupIcon from "/assets/pickup.svg"
import branchArrow from "/assets/brancharrow.svg"
import adressIcon from "/assets/adress.svg"
import { Logo, NotFound, Searchbar } from ".."
import useBranchSelector from "./hooks/useBranchSelector"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useTranslation } from "react-i18next"

const BranchSelector = ({data, image}: {data: BranchOffice[], image: string}) => {
  const {handleSearch, loading, confirmBranch, branches } = useBranchSelector(data)

  const { t } = useTranslation("branchSelector")

  return (
    <div className={style.branchSelector}>
      <header>
        <Logo imageUrl={image} />
        {t("title")}
      </header>
      <Searchbar handleSearch={handleSearch} placeholder={t("searchPlaceholder")} />
      <main>
        <p>
          {loading ? (
            <Skeleton style={{ width: "15ch", height: "1.5rem" }} />
          ) : branches.length ? (
            `${t("title")} ( ${branches.length} )`
          ) : (
            ""
          )}
        </p>
        {loading ? (
          <>
            <br />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
          </>
        ) : branches.length ? (
          branches.map((item) => (
            <SelectableBranch branch={item} select={confirmBranch} key={item.id} />
          ))
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  )
}

export default BranchSelector

const SelectableBranch = ({
  branch,
  select
}: {
  branch: BranchOffice
  select: (param: BranchOffice) => void
}) => {
  const { address, location, branch_name, has_pickup } = branch
  const { t } = useTranslation("branchSelector")

  return (
    <article onClick={() => select(branch)}>
      <section>
        {has_pickup ? (
          <div>
            <img src={pickupIcon} alt="" draggable={false} />
            {t("pickup")}
          </div>
        ) : null}
        <div>
          <img src={menuIcon} alt="" draggable={false} />
          {t("menu")}
        </div>
      </section>
      <section>
        <h2>{branch_name}</h2>
      </section>
      <section>
        <div>
          <img src={adressIcon} alt="" draggable={false} />{" "}
          <span>
            {address}, {location}
          </span>
        </div>
        <img className={style.arrow} src={branchArrow} alt="" draggable={false} />
      </section>
    </article>
  )
}
