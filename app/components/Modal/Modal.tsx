import { ReactNode, useEffect } from "react"
import style from "./modal.module.css"

const Modal = ({
  children,
  onClick = () => null
}: {
  children: ReactNode
  onClick?: () => void
}) => {
  useEffect(() => {
    document.documentElement.setAttribute("style", "overflow:hidden")

    return () => document.documentElement.removeAttribute("style")
  }, [])

  return (
    <div className={style.overlay} onClick={onClick}>
      {children}
    </div>
  )
}

export default Modal
