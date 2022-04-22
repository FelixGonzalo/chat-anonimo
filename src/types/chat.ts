import { MessageType } from './message'

export type ChatType = {
  id: string
  usersId: Array<string>
  messages: Array<MessageType> | []
}

export type ActiveChatType = {
  id: string
  users: Array<ChatUserType>
  messages: Array<MessageType> | []
}

export type ChatUserType = {
  id: string
  nick: string
}
