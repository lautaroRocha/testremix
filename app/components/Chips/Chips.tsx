import style from "./chips.module.css"
import foodIcon from "../../assets/food.svg"
import { Option } from "../../@types"
import { useContext, useEffect, useRef } from "react"
import { PickupContext } from "../../App"
interface OptionWithIcon extends Option {
  icon?: string
}
export interface ChipsProps {
  data: OptionWithIcon[]
  selected: string
  select: (param: string) => void
  smallHeader: boolean
}

const Chips = ({ data, selected, select, smallHeader }: ChipsProps) => {
  const isSelected = (param: string) => selected === param

  const { isPickup } = useContext(PickupContext)

  const selectedChipRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedChipRef.current && containerRef.current) {
      const chip = selectedChipRef.current
      const container = containerRef.current
      const scrollAmount = chip.offsetLeft - container.offsetLeft
      container.scrollLeft = scrollAmount - 70
    }
  }, [selected])

  useEffect(() => {
    const container = containerRef.current

    const detectTrackPad = (e: any) => {
      let isTrackpad = false
      if (e.wheelDeltaY) {
        if (e.wheelDeltaY === e.deltaY * -3) {
          isTrackpad = true
        }
      } else if (e.deltaMode === 0) {
        isTrackpad = true
      }
      return isTrackpad
    }

    const handleWheel = (e: any) => {
      const isTrackpad = detectTrackPad(e)
      if (container && !isTrackpad) {
        e.preventDefault()

        const scrollAmount = e.deltaY
        container.scrollLeft += scrollAmount * 3
      } else {
        const scrollAmount = e.deltaY
        container!.scrollLeft += scrollAmount
      }
    }

    container?.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      container?.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return (
    <>
      <div
        className={`${style.chips} ${isPickup ? style.pickup : ""} ${
          smallHeader ? style.small : ""
        }`}
        ref={containerRef}
      >        
      {data.map((op) => {
          return (
            <span
              ref={isSelected(op.label) ? selectedChipRef : null}
              className={isSelected(op.label as string) ? style.selected : ""}
              onClick={() => select(op.value)}
              id={`${op.value}-category-chip`}
              key={op.value}
            >
              <span className={style.imgDrop}></span>
              <img
                src={foodIcon}
                alt={`${op.value}-category-icon`}
                id={`${op.value}-category-icon`}
                draggable={false}
              />
              <label>{op.label}</label>
            </span>
          )
        })}
      </div>
      {selected ? <h2 className={style.selectedTitle}>{selected}</h2> : null}
    </>
  )
}

export default Chips
