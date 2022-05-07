import { AnyAction } from 'redux'
import { activeChatActionTypes as ActionType } from '../action-types/activeChatActionTypes'
import { ActiveChatType } from '../../types/chat'
import { MessageType } from '../../types/message'

interface setActiveChatAction {
  type: ActionType.SET_ACTIVE_CHAT
  payload: ActiveChatType
}

interface addMessageToActiveChatAction {
  type: ActionType.ADD_MESSAGE_TO_ACTIVE_CHAT
  payload: MessageType
}

interface removeMessageFromActiveChatAction {
  type: ActionType.REMOVE_MESSAGE_FROM_ACTIVE_CHAT
  payload: { messageId: string; userId: string }
}

export type activeChatActions =
  | setActiveChatAction
  | addMessageToActiveChatAction
  | removeMessageFromActiveChatAction
  | AnyAction

export type activeChatActionCreators =
  | setActiveChatAction
  | addMessageToActiveChatAction
  | removeMessageFromActiveChatAction
