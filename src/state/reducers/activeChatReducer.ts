import { activeChatActions as Action } from '../actions/activeChatActions'
import { activeChatActionTypes as ActionType } from '../action-types/activeChatActionTypes'
import { MessageType } from '../../types/message'
import { ChatUserType } from '../../types/chat'

type InitialStateProps = {
  id: string
  users: Array<ChatUserType>
  messages: Array<MessageType>
}

const initialState: InitialStateProps = {
  id: '',
  users: [],
  messages: [],
}

export const activeChatReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CHAT:
      return action.payload
    case ActionType.ADD_MESSAGE_TO_ACTIVE_CHAT:
      return { ...state, messages: [...state.messages, action.payload] }
    case ActionType.REMOVE_MESSAGE_FROM_ACTIVE_CHAT:
      return removeMessageFromActiveChat(state, action)
    default:
      return state
  }
}

function removeMessageFromActiveChat(state: InitialStateProps, action: Action) {
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
