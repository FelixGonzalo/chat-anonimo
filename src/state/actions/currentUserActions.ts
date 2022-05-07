import { AnyAction } from 'redux'
import { currentUserActionTypes as ActionType } from '../action-types/currentUserActionTypes'
import { UserType } from '../../types/user'

interface setCurrentUserAction {
  type: ActionType.SET_CURRENT_USER
  payload: UserType
}

export type currentUserActions = setCurrentUserAction | AnyAction

export type currentUserActionCreators = setCurrentUserAction
