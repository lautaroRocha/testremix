import style from "./withBackButton.module.css"
import { NavLink, useNavigate, useParams } from "@remix-run/react"
import homeIcon from "/assets/home.svg"
import menuIcon from "/assets/menu.svg"
import arrowIcon from "/assets/back.svg"
import navMenuIcon from "/assets/navMenu.svg"
import pickupIcon from "/assets/pickup.svg"
import userIcon from "/assets/user.svg"
import loginIcon from "/assets/login.svg"
import siginIcon from "/assets/signin.svg"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../redux/hooks"

interface WithBackButtonProps {
  children: React.ReactNode
  withLabel?: boolean
  withMenu?: boolean
}

const WithBackButton: React.FC<WithBackButtonProps> = ({ children, withLabel, withMenu }) => {
  const navigate = useNavigate()

  const { business, branch } = useParams()
  const [openNav, setOpenNav] = useState<boolean>(false)
  const { pathname } = window.location
  const [isMenuOrPickup, setIsMenuOrPickup] = useState<boolean>()

  useEffect(() => {
    const { pathname } = window.location
    setIsMenuOrPickup(
      pathname === `/${business}/${branch}/menu` || pathname === `/${business}/${branch}/pickup`
    )
  }, [window.location.pathname])

  const { t } = useTranslation("withBackButton")

  const { selected } = useAppSelector((state) => state.branch)

  const label = pathname.split("/")[3] === "menu" ? t("menuLabel") : t("pickupLabel")
  const icon = pathname.split("/")[3] === "menu" ? menuIcon : pickupIcon

  const handleBackNavigation = () => {
    const isSelectedBranch = pathname === `/${business}/${branch}`
    const titleTag = document.querySelector("title")
    if (isMenuOrPickup) {
      if (titleTag) {
        ;(titleTag as HTMLTitleElement).textContent =
          business!.charAt(0).toUpperCase() + business!.slice(1)
        titleTag!.textContent = `${business!.charAt(0).toUpperCase() + business!.slice(1)} - ${
          selected?.branch_name
        }`
      }
      return navigate(`/${business}/${branch}`, { replace: true })
    }
    if (isSelectedBranch) {
      if (titleTag) {
        ;(titleTag as HTMLTitleElement).textContent =
          business!.charAt(0).toUpperCase() + business!.slice(1)
        titleTag!.textContent = `${business!.charAt(0).toUpperCase() + business!.slice(1)}`
      }
      return navigate(`/${business}/seleccionar-sucursal`, { replace: true })
    }

    return navigate(-1)
  }

  return (
    <>
      <section className={`${style.withBackButton} ${!isMenuOrPickup ? style.withArrow : ""}`}>
        <button onClick={handleBackNavigation} className={style.backButton} id="back-button">
          <img src={isMenuOrPickup ? homeIcon : arrowIcon} alt="back-btn" draggable={false} />
        </button>
        {withLabel ? (
          <span className={style.withLabel}>
            <img src={icon} draggable={false} />
            {label}
          </span>
        ) : (
          <></>
        )}
        {withMenu ? (
          <button
            type="button"
            id="sidemenu-button"
            className={style.withMenu}
            onClick={() => {
              setOpenNav(true)
            }}
          >
            <img src={navMenuIcon} draggable={false} />
          </button>
        ) : (
          <></>
        )}
      </section>
      {children}
      <div
        className={`${style.navOverlay} ${openNav ? style.openNav : ""}`}
        onClick={() => setOpenNav(false)}
      >
        <nav onClick={(e) => e.stopPropagation()} tabIndex={-1}>
          <header tabIndex={-1}>
            <img src={userIcon} alt="" tabIndex={-1} draggable={false} />
            <button
              className={style.backButton}
              onClick={() => setOpenNav(false)}
              tabIndex={-1}
              id="close-sidemenu-button"
            >
              <img src={arrowIcon} alt="back-btn" draggable={false} />
            </button>
          </header>
          <ul tabIndex={-1}>
            <li>
              <NavLink
                tabIndex={-1}
                to={`/${business}/${branch}/pickup`}
                className={({ isActive }) => (isActive ? style.activeLink : "")}
                onClick={() => {
                  setOpenNav(false)
                }}
              >
                <img src={pickupIcon} draggable={false} />
                {t("nav.pickup")}
              </NavLink>
            </li>
            <li>
              <NavLink
                tabIndex={-1}
                to={`/${business}/${branch}/menu`}
                onClick={() => {
                  setOpenNav(false)
                }}
                className={({ isActive }) => (isActive ? style.activeLink : "")}
              >
                <img src={menuIcon} draggable={false} />
                {t("nav.menu")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={""}
                tabIndex={-1}
                style={{
                  cursor: "not-allowed",
                  color: "lightgray",
                  pointerEvents: "none"
                }}
              >
                <img src={loginIcon} draggable={false} />
                {t("nav.login")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={""}
                tabIndex={-1}
                style={{
                  cursor: "not-allowed",
                  color: "lightgray",
                  pointerEvents: "none"
                }}
              >
                <img src={siginIcon} draggable={false} />
                {t("nav.signin")}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export const withBackButton = (
  element: React.ReactElement,
  withLabel?: boolean,
  withMenu?: boolean
) => {
  return (
    <WithBackButton withLabel={withLabel || false} withMenu={withMenu || false}>
      {element}
    </WithBackButton>
  )
}
