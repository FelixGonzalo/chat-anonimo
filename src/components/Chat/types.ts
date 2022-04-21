import { ChatUserType } from '../../types/privateChat'
import { MessageType } from '../../types/message'

export type ChatProps = {
  users: Array<ChatUserType>
  messages: Array<MessageType> | []
}
