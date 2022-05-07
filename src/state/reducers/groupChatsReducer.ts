import { groupChatsActions as Action } from '../actions/groupChatsActions'
import { groupChatsActionTypes as ActionType } from '../action-types/groupChatsActionTypes'
import { GroupChatType } from '../../types/chat'

type InitialStateProps = {
  categories: Array<string>
  chats: Array<GroupChatType>
}

const initialState: InitialStateProps = {
  categories: ['libre', 'chistes', 'acertijos'],
  chats: [],
}

export const groupChatsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.INIT_GROUP_CHATS_STATE:
      if (!action.payload) return state
      return { ...state, chats: action.payload }
    case ActionType.ADD_GROUP_CHAT:
      return { ...state, chats: [...state.chats, action.payload] }
    case ActionType.ADD_USER_IN_GROUP_CHAT:
      return addUserInGroupChat(state, action)
    default:
      return state
  }
}

function addUserInGroupChat(state: InitialStateProps, action: Action) {
  const { userId, groupChatId } = action.payload

  const updateChats = state.chats.map((chat) => {
    if (chat.id === groupChatId) {
      return {
        ...chat,
        usersId: [...chat.usersId, userId],
      }
    }
    return chat
  })
  return { ...state, chats: updateChats }
}
