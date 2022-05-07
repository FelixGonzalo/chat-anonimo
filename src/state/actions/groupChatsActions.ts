import { AnyAction } from 'redux'
import { groupChatsActionTypes as ActionType } from '../action-types/groupChatsActionTypes'
import { GroupChatType } from '../../types/chat'

interface initGroupChatsStateAction {
  type: ActionType.INIT_GROUP_CHATS_STATE
  payload: Array<GroupChatType>
}

interface addGroupChatAction {
  type: ActionType.ADD_GROUP_CHAT
  payload: GroupChatType
}

interface addUserInGroupChatAction {
  type: ActionType.ADD_USER_IN_GROUP_CHAT
  payload: { userId: string; groupChatId: string }
}

export type groupChatsActions =
  | initGroupChatsStateAction
  | addGroupChatAction
  | addUserInGroupChatAction
  | AnyAction

export type groupChatsActionCreators =
  | initGroupChatsStateAction
  | addGroupChatAction
  | addUserInGroupChatAction
