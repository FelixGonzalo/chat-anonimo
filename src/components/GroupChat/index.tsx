import { useActiveGroupChat } from '../../hooks/useActiveGroupChat'
import { useScrollBottom } from '../../hooks/useScrollBottom'
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatMessagesContainer,
} from '../Chat/styles'
import { GroupMessageForm } from '../GroupMessageForm'
import { Message } from '../Message'

export function GroupChat() {
  const { activeGroupChat } = useActiveGroupChat()
  const { refElement } = useScrollBottom(activeGroupChat.messages)

  return (
    <ChatContainer>
      <ChatHeader>🌎 {activeGroupChat.name}</ChatHeader>
      <ChatMessagesContainer ref={refElement}>
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
