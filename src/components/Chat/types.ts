import { ChatUserType } from '../../types/privateChat'
import { MessageProps } from '../Message/types'

export type ChatProps = {
  users: Array<ChatUserType>
  messages: Array<MessageProps> | []
}
