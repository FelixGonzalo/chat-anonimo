export type PrivateChatType = {
  id: string
  usersId: Array<string>
  messages: Array<any> | []
}

export type PrivateChatWithUsersType = {
  id: string
  users: Array<ChatUserType>
  messages: Array<any> | []
}

export type ChatUserType = {
  id: string
  nick: string
}
