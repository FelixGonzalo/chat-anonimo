import { AnyAction } from 'redux'
import { PrivateChatWithUsersType } from '../types/privateChat'

const initialState = {
  id: '',
  users: [],
  messages: [],
}

export const activeChatReducer = (state = initialState, action: AnyAction) => {
  if (action.type === 'SET_ACTIVE_CHAT_ID') {
    return action.payload
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
