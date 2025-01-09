import { CSSProperties } from "react"
import style from "./Toast.module.css"
import checkIcon from "../../assets/check.svg"
import errorIcon from "./assets/error.svg"

export interface ToastProps {
  icon?: string
  text: string
  buttonText?: string
  onButtonClick?: () => void
  isError?: boolean
  styles?: CSSProperties
  fullScreen?: boolean
  iconStyles?: CSSProperties
}

const Toast = ({
  icon = checkIcon,
  text,
  buttonText,
  onButtonClick,
  isError,
  styles = {},
  fullScreen = false,
  iconStyles = {}
}: ToastProps) => {
  return (
    <div
      className={`${style.container} ${isError ? style.error : ""} ${
        fullScreen ? style.fullScreen : ""
      }`}
      style={styles}
    >
      <div className={style.icon}>
        {!isError ? (
          <img draggable={false} src={icon} style={iconStyles} />
        ) : (
          <img draggable={false} src={errorIcon} style={iconStyles} />
        )}
      </div>
      <span className={style.text}>{text}</span>
      <button className={style.button} onClick={onButtonClick} type="button" id="toast-btn">
        {buttonText}
      </button>
    </div>
  )
}

export default Toast
