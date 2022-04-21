import { useDispatch, useSelector } from 'react-redux'
import { removeMessageFromActiveChat } from '../../reducers/activeChatReducer'
import { MessageType } from '../../types/message'
import { PrivateChatType } from '../../types/privateChat'
import {
  MessageContainer,
  MessageHeader,
  UserName,
  DateName,
  ButtonDelete,
} from './styles'

export function Message({
  id,
  from,
  to,
  removedFor,
  message,
  date,
}: MessageType) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  const activeChat = useSelector((state: any) => state.activeChat)

  const removeMessage = () => {
    dispatch(removeMessageFromActiveChat(id, currentUser.id))
    removeMessageFromLocalStorage(activeChat.id, id, currentUser.id)
  }

  const removeMessageFromLocalStorage = (
    chatId: string,
    messageId: string,
    userId: string
  ) => {
    try {
      const privateChatsLocal = localStorage.getItem('privateChats') || null
      if (!privateChatsLocal) return
      const privateChats: Array<PrivateChatType> = JSON.parse(privateChatsLocal)

      const updateChats = privateChats.map((chat) => {
        if (chat.id === chatId) {
          const messageUpdate = chat.messages.map((message) => {
            if (message.id === messageId) {
              if (!message.removedFor)
                return { ...message, removedFor: [userId] }
              if (!message.removedFor.includes(userId))
                return {
                  ...message,
                  removedFor: [...message.removedFor, userId],
                }
            }
            return message
          })
          return { ...chat, messages: messageUpdate }
        }
        return chat
      })
      localStorage.setItem('privateChats', JSON.stringify(updateChats))
    } catch (error) {
      console.error(error)
    }
  }

  if (from.id === currentUser.id) {
    if (removedFor?.includes(currentUser.id)) {
      return (
        <MessageContainer currentUser={true}>
          mensaje eliminado
        </MessageContainer>
      )
    }

    return (
      <MessageContainer currentUser={true}>
        <MessageHeader>
          <span></span>
          <ButtonDelete onClick={removeMessage}>x</ButtonDelete>
        </MessageHeader>
        <p>{message}</p>

        <DateName>{new Date(date).toLocaleString()}</DateName>
      </MessageContainer>
    )
  }

  if (removedFor?.includes(currentUser.id)) {
    return (
      <MessageContainer currentUser={false}>mensaje eliminado</MessageContainer>
    )
  }

  return (
    <MessageContainer currentUser={false}>
      <MessageHeader>
        <UserName>{from.nick}</UserName>
        <ButtonDelete onClick={removeMessage}>x</ButtonDelete>
      </MessageHeader>
      <p>{message}</p>
      <DateName>{new Date(date).toLocaleString()}</DateName>
    </MessageContainer>
  )
}
