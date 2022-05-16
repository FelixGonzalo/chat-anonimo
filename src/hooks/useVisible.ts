import { useState } from 'react'

export function useVisible(initialState = true) {
  const [visible, setVisible] = useState(initialState)

  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const change = () => setVisible(!visible)

  return { visible, show, hide, change }
}
