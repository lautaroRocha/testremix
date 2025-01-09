import { imageCookie } from "~/utils/cookies.server"
import { useAppSelector } from "../../redux/hooks"
import style from "./logo.module.css"
import Cookies from "js-cookie"

interface LogoProps {
  imageUrl?: string
}

const Logo = ({ imageUrl = "" }: LogoProps) => {
  const getImageFromRedux = () => useAppSelector((state) => state.tenant.image)
  // const getImageFromCookie = async() => {
    // const image = await imageCookie.parse()

 // }

  return (
    <figure className={style.logo}>
      <img src={imageUrl ? imageUrl : Cookies.get('image')} alt="" draggable={false} />
    </figure>
  )
}

export default Logo
