import { useState } from "react"

export const useToggle = () => {
  const [show, setShow] = useState(false)
  const toggle = (value?: boolean) => {
    if (!value) setShow(s => !s)
    else setShow(value)
  }
  return [show, toggle] as const
}
