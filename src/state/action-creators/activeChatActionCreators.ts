import { activeChatActionCreators as Action } from '../actions/activeChatActions'
import { activeChatActionTypes as ActionType } from '../action-types/activeChatActionTypes'
import { ActiveChatType } from '../../types/chat'
import { ChatUserType } from '../../types/chat'

export const setActiveChat = (chat: ActiveChatType): Action => {
  return {
    type: ActionType.SET_ACTIVE_CHAT,
    payload: {
      id: chat.id,
      users: chat.users,
      messages: chat.messages,
    },
  }
}

export const addMessageToActiveChat = (
  id: string,
  from: ChatUserType,
  message: string,
  date: number
): Action => {
  return {
    type: ActionType.ADD_MESSAGE_TO_ACTIVE_CHAT,
    payload: {
      id,
      from,
      message,
      date,
    },
  }
}

export const removeMessageFromActiveChat = (
  messageId: string,
  userId: string
): Action => {
  return {
    type: ActionType.REMOVE_MESSAGE_FROM_ACTIVE_CHAT,
    payload: {
      messageId,
      userId,
    },
  }
}
