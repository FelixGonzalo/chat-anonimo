import { AnyAction } from 'redux'
import { usersActionTypes as ActionType } from '../action-types/usersActionTypes'
import { UserType } from '../../types/user'

interface initUserStateAction {
  type: ActionType.INIT_USERS_STATE
  payload: Array<UserType>
}

interface addUserAction {
  type: ActionType.ADD_USER_TO_USERS
  payload: UserType
}

interface updateChatListOfUserAction {
  type: ActionType.UPDATE_CHATLIST_OF_USER
  payload: { userId: string; privateChatId: string }
}

interface updateNickOfUserAction {
  type: ActionType.UPDATE_NICK_OF_USER
  payload: { userId: string; nick: string }
}

export type usersActions =
  | initUserStateAction
  | addUserAction
  | updateChatListOfUserAction
  | updateNickOfUserAction
  | AnyAction

export type usersActionCreators =
  | initUserStateAction
  | addUserAction
  | updateChatListOfUserAction
  | updateNickOfUserAction
