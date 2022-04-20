import { useSelector } from 'react-redux'
import { Message } from '../Message'
import { ChatContainer, ChatHeader, ChatMessages } from './styles'
import { ChatProps } from './types'

export function Chat({ users, messages }: ChatProps) {
  const currentUser = useSelector((state: any) => state.currentUser)

  return (
    <ChatContainer>
      <ChatHeader>
        🥷🏻 {users.map((user) => (user.id !== currentUser.id ? user.nick : ''))}
      </ChatHeader>
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
