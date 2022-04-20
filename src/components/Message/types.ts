import { UserProps } from '../User/types'

export type MessageProps = {
  user_from: UserProps
  user_to: UserProps
  message: string
  date: number
}
