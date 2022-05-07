import { groupChatsActionCreators as Action } from '../actions/groupChatsActions'
import { groupChatsActionTypes as ActionType } from '../action-types/groupChatsActionTypes'
import { GroupChatType } from '../../types/chat'

export const initGroupChatsState = (chats: Array<GroupChatType>): Action => {
  return {
    type: ActionType.INIT_GROUP_CHATS_STATE,
    payload: chats,
  }
}

export const addGroupChat = (groupChat: GroupChatType): Action => {
  return {
    type: ActionType.ADD_GROUP_CHAT,
    payload: groupChat,
  }
}

export const addUserInGroupChat = (
  userId: string,
  groupChatId: string
): Action => {
  return {
    type: ActionType.ADD_USER_IN_GROUP_CHAT,
    payload: { userId, groupChatId },
  }
}
