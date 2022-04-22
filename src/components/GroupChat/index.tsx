import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ActiveGroupChatType } from '../../types/chat'
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatMessagesContainer,
} from '../Chat/styles'
import { GroupMessageForm } from '../GroupMessageForm'
import { Message } from '../Message'

export function GroupChat() {
  const refZonaChat = useRef<HTMLHeadingElement>(null)
  const activeGroupChat: ActiveGroupChatType = useSelector(
    (state: any) => state.activeGroupChat
  )

  useEffect(() => {
    try {
      const updateScroll = refZonaChat?.current?.scrollHeight
      if (updateScroll) {
        refZonaChat.current.scrollTop = updateScroll
      }
    } catch (error) {
      console.error(error)
    }
  }, [activeGroupChat.messages])

  return (
    <ChatContainer>
      <ChatHeader>🌎 {activeGroupChat.name}</ChatHeader>
      <ChatMessagesContainer ref={refZonaChat}>
        <ChatMessages>
          {activeGroupChat.messages &&
            activeGroupChat.messages.map((msg) => (
              <Message
                key={msg.id}
                id={msg.id}
                from={msg.from}
                message={msg.message}
                date={msg.date}
                removedFor={msg.removedFor}
              />
            ))}
        </ChatMessages>
      </ChatMessagesContainer>
      <GroupMessageForm />
    </ChatContainer>
  )
}
