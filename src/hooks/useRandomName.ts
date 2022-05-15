import { ChangeEvent, useState } from 'react'

export function useRandomName(basicName = 'anonymous'): [string, object] {
  const [name, setName] = useState(
    `${basicName}${Math.floor(Math.random() * (1000 - 10) + 10)}`
  )

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return [name, onChange]
}
