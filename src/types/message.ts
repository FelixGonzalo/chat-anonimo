import { ChatUserType } from './privateChat'

export type MessageType = {
  from: ChatUserType
  to: ChatUserType
  message: string
  date: number
}
