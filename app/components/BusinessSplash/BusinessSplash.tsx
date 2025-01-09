import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import style from "./BusinessSplash.module.css"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Cookies from "js-cookie"

const BusinessSplash = ({image}:{image:string}) => {
  const location = useLocation();
  const { business } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation("splash")
  const [notInSplash, setNotInSplash] = useState<boolean>(true)

  useEffect(() => {
    if(!Cookies.get('image')){
        Cookies.set('image', image)
    }
  }, [])

  
  useEffect(() => {
    const NOT_IN_SPLASH = location.pathname.split("/").length > 2
    setNotInSplash(notInSplash)
    let timer : any;
    if (!NOT_IN_SPLASH) {
      timer = setTimeout(() => {
        navigate(`/${business}/seleccionar-sucursal`)
      }, 2000)
    }

    return () => clearTimeout(timer)
  }, [location.pathname, business, navigate]);

  if (!notInSplash) {
    console.log('NOT IN SPLASH')
    return <Outlet />
  }

  return (
    <div className={style.businessSplash}>
      <figure className={style.animateLogo}>
        <img src={image} alt="" draggable={false} />
      </figure>
      <span className={style.animateCaption}>{t("message")}</span>
    </div>
  )
}

export default BusinessSplash
