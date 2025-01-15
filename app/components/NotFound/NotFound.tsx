import style from "./notFound.module.css"
import notFound from "./assets/notFound.svg"
import { useTranslation } from "react-i18next"

const NotFound = () => {
  const { t } = useTranslation("notFound")

  return (
    <div className={style.notFound}>
      <img src={notFound} alt="" draggable={false} />
      <span>{t("message")}</span>
    </div>
  )
}

export default NotFound
