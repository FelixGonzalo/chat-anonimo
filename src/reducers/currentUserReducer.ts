import { AnyAction } from 'redux'
import { UserType } from '../types/user'

export const currentUserReducer = (
  state: UserType | null = null,
  action: AnyAction
) => {
  if (action.type === 'SET_CURRENT_USER') {
    return action.payload || state
  }

  return state
}

// action creators

export const setCurrentUser = (user: UserType) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  }
}
