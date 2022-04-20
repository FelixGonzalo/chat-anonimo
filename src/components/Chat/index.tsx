import { useSelector } from 'react-redux'
import { Message } from '../Message'
import { MessageProps } from '../Message/types'
import { UserProps } from '../User/types'
import { ChatContainer, ChatHeader, ChatMessages } from './styles'

type ChatProps = {
  userTo?: UserProps | null
  messages: Array<MessageProps> | []
}

export function Chat({ userTo, messages }: ChatProps) {
  const userfrom = useSelector((state: any) => state.currentUser)

  if (!userfrom) {
    return <ChatContainer>Ingresa tu nick para activar el chat</ChatContainer>
  }

  if (!userTo) {
    return <ChatContainer>Inicia un chat!</ChatContainer>
  }

  return (
    <ChatContainer>
      <ChatHeader>🥷🏻 {userTo.nick}</ChatHeader>
      <ChatMessages>
        {messages &&
          messages.map((msg, index) => (
            <Message
              key={index}
              user_from={msg.user_from}
              user_to={msg.user_to}
              message={msg.message}
              date={msg.date}
            />
          ))}
      </ChatMessages>
    </ChatContainer>
  )
}
