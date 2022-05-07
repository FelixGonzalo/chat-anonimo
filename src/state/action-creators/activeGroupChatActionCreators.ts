import { activeGroupChatActionCreators as Action } from '../actions/activeGroupChatActions'
import { activeGroupChatActionTypes as ActionType } from '../action-types/activeGroupChatActionTypes'
import { ChatUserType } from '../../types/chat'
import { ActiveGroupChatType } from '../../types/chat'

export const setActiveGroupChat = (chat: ActiveGroupChatType): Action => {
  return {
    type: ActionType.SET_ACTIVE_GROUP_CHAT,
    payload: chat,
  }
}

export const addMessageToActiveGroupChat = (
  id: string,
  from: ChatUserType,
  message: string,
  date: number
): Action => {
  return {
    type: ActionType.ADD_MESSAGE_TO_ACTIVE_GROUP_CHAT,
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
): Action => {
  return {
    type: ActionType.REMOVE_MESSAGE_FROM_ACTIVE_GROUP_CHAT,
    payload: {
      messageId,
      userId,
    },
  }
}
