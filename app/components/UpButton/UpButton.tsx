import style from "./UpButton.module.css"
import arrowIcon from "/assets/brancharrow.svg"
import { useEffect, useRef, useState } from "react"

const UpButton = ({ right, bottom }: { right?: string; bottom?: string }) => {
  const upButtonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  const scrollThreshold = 300

  const handleScroll = () => {
    if (upButtonRef.current && upButtonRef.current.parentElement) {
      const verticalScroll = upButtonRef.current.parentElement.scrollTop
      if (verticalScroll > scrollThreshold) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
  }

  useEffect(() => {
    if (upButtonRef.current) {
      upButtonRef.current.parentElement?.addEventListener("scroll", handleScroll)
    }
    return () => {
      upButtonRef?.current?.parentElement?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const goUp = () => {
    upButtonRef.current?.parentElement?.scrollTo(0, 0)
  }

  return (
    <button
      type="button"
      id="upButton-btn"
      className={`${style.upButton} ${visible ? style.visible : ""}`}
      ref={upButtonRef}
      onClick={goUp}
      style={{
        right: right ? right : "",
        bottom: bottom ? bottom : ""
      }}
    >
      <img src={arrowIcon} alt="up-btn-icon" draggable={false} />
    </button>
  )
}

export default UpButton
