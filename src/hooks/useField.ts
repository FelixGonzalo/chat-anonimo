import { ChangeEvent, useState } from 'react'

export function useField(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {
    value,
    setValue,
    onChange,
  }
}
