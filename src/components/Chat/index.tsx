import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useScrollBottom } from '../../hooks/useScrollBottom'
import { Message } from '../Message'
import { MessageForm } from '../MessageForm'
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatMessagesContainer,
} from './styles'
import { ChatProps } from './types'

export function Chat({ users, messages }: ChatProps) {
  const { currentUser } = useCurrentUser()
  const { refElement } = useScrollBottom(messages)

  return (
    <ChatContainer>
      <ChatHeader>
        🥷🏻 {users.map((user) => (user.id !== currentUser?.id ? user.nick : ''))}
      </ChatHeader>
      {users.length < 1 && <h3>Inicia un chat</h3>}
      <ChatMessagesContainer ref={refElement}>
        <ChatMessages>
          {messages &&
            messages.map((msg, index) => (
              <Message
                key={index}
                id={msg.id}
                from={msg.from}
                message={msg.message}
                date={msg.date}
                removedFor={msg.removedFor}
              />
            ))}
        </ChatMessages>
      </ChatMessagesContainer>
      {users.length > 0 && <MessageForm />}
    </ChatContainer>
  )
}
