import { privateChatsActionCreators as Action } from '../actions/privateChatsActions'
import { privateChatsActionTypes as ActionType } from '../action-types/privateChatsActionTypes'
import { ChatType } from '../../types/chat'

export const initPrivateChatsState = (chats: Array<ChatType>): Action => {
  return {
    type: ActionType.INIT_PRIVATE_CHATS_STATE,
    payload: chats,
  }
}

export const addPrivateChat = ({ id, usersId, messages }: ChatType): Action => {
  return {
    type: ActionType.ADD_PRIVATE_CHAT,
    payload: {
      id,
      usersId,
      messages,
    },
  }
}
