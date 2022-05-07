import { activeGroupChatAction as Action } from '../actions/activeGroupChatActions'
import { activeGroupChatActionTypes as ActionType } from '../action-types/activeGroupChatActionTypes'
import { MessageType } from '../../types/message'
import { ActiveGroupChatType } from '../../types/chat'

const initialState: ActiveGroupChatType = {
  id: '',
  name: '',
  createdBy: '',
  category: '',
  users: [],
  messages: [],
}

export const activeGroupChatReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_GROUP_CHAT:
      return action.payload
    case ActionType.ADD_MESSAGE_TO_ACTIVE_GROUP_CHAT:
      return { ...state, messages: [...state.messages, action.payload] }
    case ActionType.REMOVE_MESSAGE_FROM_ACTIVE_GROUP_CHAT:
      return removeMessageFromActiveGroupChat(state, action)
    default:
      return state
  }
}

function removeMessageFromActiveGroupChat(
  state: ActiveGroupChatType,
  action: Action
) {
  const { messageId, userId } = action.payload
  const messagesUpdate: Array<MessageType> = state.messages.map(
    (message: MessageType) => {
      if (message.id === messageId) {
        if (!message.removedFor) return { ...message, removedFor: [userId] }
        if (!message.removedFor.includes(userId))
          return { ...message, removedFor: [...message.removedFor, userId] }
      }
      return message
    }
  )
  return { ...state, messages: messagesUpdate }
}
