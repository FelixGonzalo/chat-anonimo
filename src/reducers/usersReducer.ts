import { AnyAction } from 'redux'
import { UserType } from '../types/user'

export const usersReducer = (
  state: Array<UserType> = [],
  action: AnyAction
) => {
  if (action.type === 'INIT_USERS_STATE') {
    return action.payload || state
  }

  if (action.type === 'ADD_USER_TO_USERS') {
    const index = state.findIndex(
      (user: UserType) => user.id === action.payload.id
    )
    if (index === -1) return [...state, action.payload]
  }

  if (action.type === 'UPDATE_CHATLIST_OF_USER') {
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

  if (action.type === 'UPDATE_NICK_OF_USER') {
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

  return state
}

// action creators

export const initUserState = (users: Array<UserType>) => {
  return {
    type: 'INIT_USERS_STATE',
    payload: users,
  }
}

export const addUser = ({ id, nick, privateChatsId }: UserType) => {
  return {
    type: 'ADD_USER_TO_USERS',
    payload: {
      id,
      nick,
      privateChatsId,
    },
  }
}

export const updateChatListOfUser = (userId: string, privateChatId: string) => {
  return {
    type: 'UPDATE_CHATLIST_OF_USER',
    payload: {
      userId,
      privateChatId,
    },
  }
}

export const updateNickOfUser = (userId: string, nick: string) => {
  return {
    type: 'UPDATE_NICK_OF_USER',
    payload: {
      userId,
      nick,
    },
  }
}
