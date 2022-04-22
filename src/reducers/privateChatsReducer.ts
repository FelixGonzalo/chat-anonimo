import { AnyAction } from 'redux'
import { ChatType } from '../types/chat'

export const privateChatsReducer = (
  state: Array<ChatType> = [],
  action: AnyAction
) => {
  if (action.type === 'INIT_PRIVATE_CHATS_STATE') {
    return action.payload || state
  }

  if (action.type === 'ADD_PRIVATE_CHAT') {
    const index = state.findIndex(
      (chat: ChatType) =>
        chat.usersId.includes(action.payload.usersId[0]) &&
        chat.usersId.includes(action.payload.usersId[1])
    )

    if (index === -1) return [...state, action.payload]
  }

  return state
}

// actions creators

export const initPrivateChatsState = (chats: Array<ChatType>) => {
  return {
    type: 'INIT_PRIVATE_CHATS_STATE',
    payload: chats,
  }
}

export const addPrivateChat = ({ id, usersId, messages }: ChatType) => {
  return {
    type: 'ADD_PRIVATE_CHAT',
    payload: {
      id,
      usersId,
      messages,
    },
  }
}
