import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { ChatType } from '../types/chat'
import { useActiveChat } from './useActiveChat'
import { useActiveGroupChat } from './useActiveGroupChat'
import { useCurrentUser } from './useCurrentUser'

export function useRemoveMessageFromChat(id: string) {
  const dispatch = useDispatch()
  const { currentUser } = useCurrentUser()
  const { activeChat } = useActiveChat()
  const { activeGroupChat } = useActiveGroupChat()

  const removeMessage = () => {
    if (!currentUser) return
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

  return { removeMessage }
}
