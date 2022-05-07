import { AnyAction } from 'redux'
import { activeGroupChatActionTypes as ActionType } from '../action-types/activeGroupChatActionTypes'
import { ActiveGroupChatType } from '../../types/chat'
import { ChatUserType } from '../../types/chat'

interface setActiveGroupChatAction {
  type: ActionType.SET_ACTIVE_GROUP_CHAT
  payload: ActiveGroupChatType
}

interface addMessageToActiveGroupChatAction {
  type: ActionType.ADD_MESSAGE_TO_ACTIVE_GROUP_CHAT
  payload: { id: string; from: ChatUserType; message: string; date: number }
}

interface removeMessageFromActiveGroupChatAction {
  type: ActionType.REMOVE_MESSAGE_FROM_ACTIVE_GROUP_CHAT
  payload: { messageId: string; userId: string }
}

export type activeGroupChatAction =
  | setActiveGroupChatAction
  | addMessageToActiveGroupChatAction
  | removeMessageFromActiveGroupChatAction
  | AnyAction

export type activeGroupChatActionCreators =
  | setActiveGroupChatAction
  | addMessageToActiveGroupChatAction
  | removeMessageFromActiveGroupChatAction
