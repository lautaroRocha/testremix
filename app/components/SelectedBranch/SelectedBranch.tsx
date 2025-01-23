import style from "./SelectedBranch.module.css"
import menuIcon from "/assets/menu.svg"
import pickupIcon from "/assets/pickup.svg"
import arrowIcon from "/assets/brancharrow.svg"
import useSelectedBranch from "./hooks/useSelectedBranch"
import { BranchBadge } from ".."
import { useTranslation } from "react-i18next"
import { BranchOffice } from "~/@types"
import { ClientOnly } from "remix-utils/client-only"

const SelectedBranch = ({data, image}: {data: BranchOffice, image: string}) => {
  const { selectedBranch, loading, goToMenu, goToPickup } = useSelectedBranch(data)


  const { t } = useTranslation("selectedBranch")

  return (
    <div className={style.selectedBranch}>
      <section>
        <figure>
          <img src={image} alt="" draggable={false} />
        </figure>
        <header>
          <ClientOnly>
           { ()=><BranchBadge />}
          </ClientOnly>
        </header>
        <main className={!loading ? style.animateMain : ""}>
          <div onClick={goToMenu}>
            <img src={menuIcon} alt="" draggable={false} />
            <section>
              <h3>{t("menu.title")}</h3>
              <p>{t("menu.description")}</p>
            </section>
            <img src={arrowIcon} alt="" draggable={false} />
          </div>
          {selectedBranch?.has_pickup ? (
            <div onClick={goToPickup} className={style.pickup}>
              <img src={pickupIcon} alt="" draggable={false} />
              <section>
                <h3>{t("pickup.title")}</h3>
                <p>{t("pickup.description")}</p>
              </section>
              <img src={arrowIcon} alt="" draggable={false} />
            </div>
          ) : null}
        </main>
      </section>
    </div>
  )
}

export default SelectedBranch
