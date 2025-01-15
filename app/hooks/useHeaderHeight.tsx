import { RefObject, useEffect, useState } from "react"

const useHeaderHeight = (mainRef: RefObject<HTMLElement> | null) => {
  const [small, setSmall] = useState<boolean>(false)
  const scrollThreshold = 25
  const lastScrollY = 0

  useEffect(() => {
    if (!mainRef || !mainRef.current) {
      return
    }

    const handleScroll = () => {
      if (!mainRef || !mainRef.current) {
        return
      }
      const currentScrollY = mainRef.current.scrollTop
      if (currentScrollY > lastScrollY) {
        setSmall(true)
      } else if (currentScrollY < scrollThreshold) {
        setSmall(false)
      }
    }

    mainRef.current.addEventListener("scroll", handleScroll)

    return () => {
      mainRef && mainRef.current && mainRef.current.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return small
}

export default useHeaderHeight
