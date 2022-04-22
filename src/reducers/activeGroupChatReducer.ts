import { AnyAction } from 'redux'
import { MessageType } from '../types/message'
import { ActiveGroupChatType } from '../types/chat'
import { ChatUserType } from '../types/chat'

const initialState: ActiveGroupChatType = {
  id: '',
  name: '',
  createdBy: '',
  category: '',
  users: [],
  messages: [],
}

export const activeGroupChatReducer = (
  state = initialState,
  action: AnyAction
) => {
  if (action.type === 'SET_ACTIVE_GROUP_CHAT') {
    return action.payload
  }

  if (action.type === 'ADD_MESSAGE_TO_ACTIVE_GROUP_CHAT') {
    return { ...state, messages: [...state.messages, action.payload] }
  }

  if (action.type === 'REMOVE_MESSAGE_FROM_ACTIVE_GROUP_CHAT') {
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

export const setActiveGroupChat = (chat: ActiveGroupChatType) => {
  return {
    type: 'SET_ACTIVE_GROUP_CHAT',
    payload: chat,
  }
}

export const addMessageToActiveGroupChat = (
  id: string,
  from: ChatUserType,
  message: string,
  date: number
) => {
  return {
    type: 'ADD_MESSAGE_TO_ACTIVE_GROUP_CHAT',
    payload: {
      id,
      from,
      message,
      date,
    },
  }
}

export const removeMessageFromActiveGroupChat = (
  messageId: string,
  userId: string
) => {
  return {
    type: 'REMOVE_MESSAGE_FROM_ACTIVE_GROUP_CHAT',
    payload: {
      messageId,
      userId,
    },
  }
}
