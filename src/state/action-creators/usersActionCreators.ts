import { usersActionCreators as Action } from '../actions/usersActions'
import { usersActionTypes as ActionType } from '../action-types/usersActionTypes'
import { UserType } from '../../types/user'

export const initUserState = (users: Array<UserType>): Action => {
  return {
    type: ActionType.INIT_USERS_STATE,
    payload: users,
  }
}

export const addUser = ({ id, nick, privateChatsId }: UserType): Action => {
  return {
    type: ActionType.ADD_USER_TO_USERS,
    payload: {
      id,
      nick,
      privateChatsId,
    },
  }
}

export const updateChatListOfUser = (
  userId: string,
  privateChatId: string
): Action => {
  return {
    type: ActionType.UPDATE_CHATLIST_OF_USER,
    payload: {
      userId,
      privateChatId,
    },
  }
}

export const updateNickOfUser = (userId: string, nick: string): Action => {
  return {
    type: ActionType.UPDATE_NICK_OF_USER,
    payload: {
      userId,
      nick,
    },
  }
}
