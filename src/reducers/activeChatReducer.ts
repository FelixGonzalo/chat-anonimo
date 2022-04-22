import { AnyAction } from 'redux'
import { MessageType } from '../types/message'
import { ActiveChatType } from '../types/chat'
import { ChatUserType } from '../types/chat'

type InitialStateProps = {
  id: string
  users: Array<ChatUserType>
  messages: Array<MessageType>
}

const initialState: InitialStateProps = {
  id: '',
  users: [],
  messages: [],
}

export const activeChatReducer = (state = initialState, action: AnyAction) => {
  if (action.type === 'SET_ACTIVE_CHAT') {
    return action.payload
  }

  if (action.type === 'ADD_MESSAGE_TO_ACTIVE_CHAT') {
    return { ...state, messages: [...state.messages, action.payload] }
  }

  if (action.type === 'REMOVE_MESSAGE_FROM_ACTIVE_CHAT') {
    const { messageId, userId } = action.payload
    const messagesUpdate: any = state.messages.map((message: MessageType) => {
      if (message.id === messageId) {
        if (!message.removedFor) return { ...message, removedFor: [userId] }
        if (!message.removedFor.includes(userId))
          return { ...message, removedFor: [...message.removedFor, userId] }
      }
      return message
    })
    return { ...state, messages: messagesUpdate }
  }

  return state
}

export const setActiveChat = (chat: ActiveChatType) => {
  return {
    type: 'SET_ACTIVE_CHAT',
    payload: {
      id: chat.id,
      users: chat.users,
      messages: chat.messages,
    },
  }
}

export const addMessageToActiveChat = (
  id: string,
  from: ChatUserType,
  message: string,
  date: number
) => {
  return {
    type: 'ADD_MESSAGE_TO_ACTIVE_CHAT',
    payload: {
      id,
      from,
      message,
      date,
    },
  }
}

export const removeMessageFromActiveChat = (
  messageId: string,
  userId: string
) => {
  return {
    type: 'REMOVE_MESSAGE_FROM_ACTIVE_CHAT',
    payload: {
      messageId,
      userId,
    },
  }
}
