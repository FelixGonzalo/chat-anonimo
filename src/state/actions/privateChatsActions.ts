import { AnyAction } from 'redux'
import { privateChatsActionTypes as ActionType } from '../action-types/privateChatsActionTypes'
import { ChatType } from '../../types/chat'

interface initPrivateChatsStateAction {
  type: ActionType.INIT_PRIVATE_CHATS_STATE
  payload: Array<ChatType>
}

interface addPrivateChatAction {
  type: ActionType.ADD_PRIVATE_CHAT
  payload: ChatType
}

export type privateChatsActions =
  | initPrivateChatsStateAction
  | addPrivateChatAction
  | AnyAction

export type privateChatsActionCreators =
  | initPrivateChatsStateAction
  | addPrivateChatAction
