import { ChatUserType } from '../../types/chat'
import { MessageType } from '../../types/message'

export type ChatProps = {
  users: Array<ChatUserType>
  messages: Array<MessageType> | []
}
