import { privateChatsActions as Action } from '../actions/privateChatsActions'
import { privateChatsActionTypes as ActionType } from '../action-types/privateChatsActionTypes'
import { ChatType } from '../../types/chat'

export const privateChatsReducer = (
  state: Array<ChatType> = [],
  action: Action
) => {
  switch (action.type) {
    case ActionType.INIT_PRIVATE_CHATS_STATE:
      return action.payload || state
    case ActionType.ADD_PRIVATE_CHAT:
      return addPrivateChat(state, action)
    default:
      return state
  }
}

function addPrivateChat(state: Array<ChatType>, action: Action) {
  const index = state.findIndex(
    (chat: ChatType) =>
      chat.usersId.includes(action.payload.usersId[0]) &&
      chat.usersId.includes(action.payload.usersId[1])
  )
  if (index === -1) return [...state, action.payload]
  return state
}
