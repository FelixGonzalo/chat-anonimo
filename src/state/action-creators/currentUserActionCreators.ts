import { currentUserActionCreators as Action } from '../actions/currentUserActions'
import { currentUserActionTypes as ActionType } from '../action-types/currentUserActionTypes'
import { UserType } from '../../types/user'

export const setCurrentUser = (user: UserType): Action => {
  return {
    type: ActionType.SET_CURRENT_USER,
    payload: user,
  }
}
