import { useAppSelector } from "../../redux/hooks"
import style from "./logo.module.css"

interface LogoProps {
  imageUrl?: string
}

const Logo = ({ imageUrl = "" }: LogoProps) => {
  const getImageFromRedux = () => useAppSelector((state) => state.tenant.image)

  return (
    <figure className={style.logo}>
      <img src={imageUrl ? imageUrl : getImageFromRedux()} alt="" draggable={false} />
    </figure>
  )
}

export default Logo
