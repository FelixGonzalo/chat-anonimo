import { AnyAction } from 'redux'
import { UserProps } from '../components/User/types'

export const usersReducer = (
  state: Array<UserProps> = [],
  action: AnyAction
) => {
  if (action.type === 'INIT_USER_STATE') {
    return action.payload || state
  }

  if (action.type === 'ADD_USER') {
    const index = state.findIndex(
      (user: UserProps) => user.id === action.payload.id
    )
    if (index === -1) return [...state, action.payload]
  }

  return state
}

// action creators

export const initUserState = (users: Array<UserProps>) => {
  return {
    type: 'INIT_USER_STATE',
    payload: users,
  }
}

export const addUser = ({ id, nick }: UserProps) => {
  return {
    type: 'ADD_USER',
    payload: {
      id,
      nick,
    },
  }
}
