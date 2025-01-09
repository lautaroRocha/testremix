import { useState, useCallback, useEffect } from "react"
import { ToastProps } from "../Toast"

const useToast = (time?: number) => {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = useCallback(async (data: ToastProps) => {
    setToast(data)
    const timer = setTimeout(() => setToast(null), time || 3500)
    return () => clearTimeout(timer)
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  const handleClick = (e: MouseEvent) => {
    const { target } = e
    if (target instanceof Element && target.nodeName === "BUTTON") {
      return
    } else {
      hideToast()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [hideToast])

  return {
    toast,
    showToast,
    hideToast
  }
}

export default useToast
