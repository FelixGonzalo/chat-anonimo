import { usersActions as Action } from '../actions/usersActions'
import { usersActionTypes as ActionType } from '../action-types/usersActionTypes'
import { UserType } from '../../types/user'

export const usersReducer = (state: Array<UserType> = [], action: Action) => {
  switch (action.type) {
    case ActionType.INIT_USERS_STATE:
      return action.payload || state
    case ActionType.ADD_USER_TO_USERS:
      return addUserToUsers(state, action)
    case ActionType.UPDATE_CHATLIST_OF_USER:
      return updateChatlistOfUser(state, action)
    case ActionType.UPDATE_NICK_OF_USER:
      return updateNickOfUser(state, action)
    default:
      return state
  }
}

function addUserToUsers(state: Array<UserType>, action: Action) {
  const index = state.findIndex(
    (user: UserType) => user.id === action.payload.id
  )
  if (index === -1) return [...state, action.payload]
}

function updateChatlistOfUser(state: Array<UserType>, action: Action) {
  const { userId, privateChatId } = action.payload
  return state.map((user) => {
    if (user.id === userId) {
      if (!user.privateChatsId.includes(privateChatId)) {
        return {
          ...user,
          privateChatsId: [...user.privateChatsId, privateChatId],
        }
      }
    }
    return user
  })
}

function updateNickOfUser(state: Array<UserType>, action: Action) {
  const { userId, nick } = action.payload
  return state.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        nick,
      }
    }
    return user
  })
}
