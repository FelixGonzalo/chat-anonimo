import { currentUserActions as Action } from '../actions/currentUserActions'
import { currentUserActionTypes as ActionType } from '../action-types/currentUserActionTypes'
import { UserType } from '../../types/user'

export const currentUserReducer = (
  state: UserType | null = null,
  action: Action
) => {
  if (action.type === ActionType.SET_CURRENT_USER) {
    return action.payload || state
  }
  return state
}
