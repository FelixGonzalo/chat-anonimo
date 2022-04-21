import { ChatUserType } from './privateChat'

export type MessageType = {
  id: string
  from: ChatUserType
  message: string
  date: number
  removedFor?: Array<string>
}
