import { useState, useLayoutEffect } from "react"

export function useWindowSize() {
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return size
}
