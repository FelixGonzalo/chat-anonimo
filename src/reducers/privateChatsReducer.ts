import { AnyAction } from 'redux'
import { PrivateChatType } from '../types/privateChat'
import { ChatUserType } from '../types/privateChat'

export const privateChatsReducer = (
  state: Array<PrivateChatType> = [],
  action: AnyAction
) => {
  if (action.type === 'INIT_PRIVATE_CHATS_STATE') {
    return action.payload || state
  }

  if (action.type === 'ADD_PRIVATE_CHAT') {
    const index = state.findIndex(
      (chat: PrivateChatType) =>
        chat.usersId.includes(action.payload.usersId[0]) &&
        chat.usersId.includes(action.payload.usersId[1])
    )

    if (index === -1) return [...state, action.payload]
  }

  if (action.type === 'ADD_MESSAGE_TO_PRIVATE_CHAT') {
    return state.map((chat) => {
      if (chat.id === action.payload.id) {
        return { ...chat, messages: [...chat.messages, action.payload.message] }
      }
      return chat
    })
  }

  if (action.type === 'REMOVE_MESSAGE_FROM_PRIVATE_CHAT') {
    const { chatId, messageId, userId } = action.payload

    return state.map((chat) => {
      if (chat.id === chatId) {
        const messageUpdate = chat.messages.map((message) => {
          if (message.id === messageId) {
            if (!message.removedFor) return { ...message, removedFor: [userId] }
            if (!message.removedFor.includes(userId))
              return { ...message, removedFor: [...message.removedFor, userId] }
          }
          return message
        })
        return { ...chat, messages: messageUpdate }
      }
      return chat
    })
  }

  return state
}

// actions creators

export const initPrivateChatsState = (chats: Array<PrivateChatType>) => {
  return {
    type: 'INIT_PRIVATE_CHATS_STATE',
    payload: chats,
  }
}

export const addPrivateChat = ({ id, usersId, messages }: PrivateChatType) => {
  return {
    type: 'ADD_PRIVATE_CHAT',
    payload: {
      id,
      usersId,
      messages,
    },
  }
}

export const addMessageToPrivateChat = (
  id: string,
  messageId: string,
  from: ChatUserType,
  to: ChatUserType,
  message: string,
  date: number
) => {
  return {
    type: 'ADD_MESSAGE_TO_PRIVATE_CHAT',
    payload: {
      id,
      message: {
        id: messageId,
        from,
        to,
        message,
        date,
      },
    },
  }
}

export const removeMessageFromPrivateChat = (
  chatId: string,
  messageId: string,
  userId: string
) => {
  return {
    type: 'REMOVE_MESSAGE_FROM_PRIVATE_CHAT',
    payload: {
      chatId,
      messageId,
      userId,
    },
  }
}
