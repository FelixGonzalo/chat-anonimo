import { AnyAction } from 'redux'
import { PrivateChatWithUsersType } from '../types/privateChat'
import { ChatUserType } from '../types/privateChat'

const initialState = {
  id: '',
  users: [],
  messages: [],
}

export const activeChatReducer = (state = initialState, action: AnyAction) => {
  if (action.type === 'SET_ACTIVE_CHAT_ID') {
    return action.payload
  }

  if (action.type === 'ADD_MESSAGE_TO_ACTIVE_CHAT') {
    return { ...state, messages: [...state.messages, action.payload] }
  }

  return state
}

export const setActiveChatId = (chat: PrivateChatWithUsersType) => {
  return {
    type: 'SET_ACTIVE_CHAT_ID',
    payload: {
      id: chat.id,
      users: chat.users,
      messages: chat.messages,
    },
  }
}

export const addMessageToActiveChat = (
  from: ChatUserType,
  to: ChatUserType,
  message: string,
  date: number
) => {
  return {
    type: 'ADD_MESSAGE_TO_ACTIVE_CHAT',
    payload: {
      from,
      to,
      message,
      date,
    },
  }
}
