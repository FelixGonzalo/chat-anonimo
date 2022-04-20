import { AnyAction } from 'redux'
import { PrivateChatType } from '../types/privateChat'

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
