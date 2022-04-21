import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
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
  const currentUser = useSelector((state: any) => state.currentUser)
  const refZonaChat = useRef<HTMLHeadingElement>(null)

  if (!users || !messages) {
    return <div>nada</div>
  }

  useEffect(() => {
    try {
      const updateScroll = refZonaChat?.current?.scrollHeight
      if (updateScroll) {
        refZonaChat.current.scrollTop = updateScroll
      }
    } catch (error) {
      console.error(error)
    }
  }, [messages])

  return (
    <ChatContainer>
      <ChatHeader>
        🥷🏻 {users.map((user) => (user.id !== currentUser.id ? user.nick : ''))}
      </ChatHeader>
      <ChatMessagesContainer ref={refZonaChat}>
        <ChatMessages>
          {messages &&
            messages.map((msg, index) => (
              <Message
                key={index}
                id={msg.id}
                from={msg.from}
                to={msg.to}
                message={msg.message}
                date={msg.date}
                removedFor={msg.removedFor}
              />
            ))}
        </ChatMessages>
      </ChatMessagesContainer>
      <MessageForm />
    </ChatContainer>
  )
}
