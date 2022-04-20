import { UserProps } from './types'

export function User({ nick }: UserProps) {
  return (
    <div>
      <p>🥷 {nick ? nick : 'Sin nombre'}</p>
    </div>
  )
}
