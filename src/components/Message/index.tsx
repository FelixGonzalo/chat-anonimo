import { useDispatch, useSelector } from 'react-redux'
import { RootState, actionCreators } from '../../state'
import { MessageType } from '../../types/message'
import { ChatType } from '../../types/chat'
import {
  MessageContainer,
  MessageHeader,
  UserName,
  DateName,
  ButtonDelete,
} from './styles'

export function Message({ id, from, removedFor, message, date }: MessageType) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const activeChat = useSelector((state: RootState) => state.activeChat)
  const activeGroupChat = useSelector(
    (state: RootState) => state.activeGroupChat
  )

  const removeMessage = () => {
    if (activeChat.id) {
      dispatch(actionCreators.removeMessageFromActiveChat(id, currentUser.id))
      removeMessageFromLocalStorage(
        activeChat.id,
        id,
        currentUser.id,
        'privateChats'
      )
    } else {
      dispatch(
        actionCreators.removeMessageFromActiveGroupChat(id, currentUser.id)
      )
      removeMessageFromLocalStorage(
        activeGroupChat.id,
        id,
        currentUser.id,
        'groupChats'
      )
    }
  }

  const removeMessageFromLocalStorage = (
    chatId: string,
    messageId: string,
    userId: string,
    itemLocalStorage: string
  ) => {
    try {
      const chatsLocal = localStorage.getItem(itemLocalStorage) || null
      if (!chatsLocal) return
      const chats: Array<ChatType> = JSON.parse(chatsLocal)

      const updateChats = chats.map((chat) => {
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
      localStorage.setItem(itemLocalStorage, JSON.stringify(updateChats))
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
