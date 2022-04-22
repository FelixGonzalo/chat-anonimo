import { MessageType } from './message'

export type ChatType = {
  id: string
  usersId: Array<string>
  messages: Array<MessageType> | []
}

export type GroupChatType = {
  id: string
  name: string
  usersId: Array<string>
  createdBy: string
  category: string
  messages: Array<MessageType> | []
}

export type ActiveChatType = {
  id: string
  users: Array<ChatUserType>
  messages: Array<MessageType> | []
}

export type ActiveGroupChatType = {
  id: string
  name: string
  createdBy: string
  category: string
  users: Array<ChatUserType>
  messages: Array<MessageType>
}

export type ChatUserType = {
  id: string
  nick: string
}
