import { AnyAction } from 'redux'
import { UserProps } from '../components/User/types'

export const currentUserReducer = (
  state: UserProps | null = null,
  action: AnyAction
) => {
  if (action.type === 'SET_CURRENT_USER') {
    return action.payload || state
  }

  return state
}

// action creators

export const setCurrentUser = (user: UserProps) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  }
}
