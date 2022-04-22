import { AnyAction } from 'redux'
import { GroupChatType } from '../types/chat'

const initialState: {
  categories: Array<string>
  chats: Array<GroupChatType>
} = {
  categories: ['libre', 'chistes', 'acertijos'],
  chats: [],
}

export const groupChatsReducer = (state = initialState, action: AnyAction) => {
  if (action.type === 'INIT_GROUP_CHATS_STATE') {
    if (!action.payload) return state
    return { ...state, chats: action.payload }
  }

  if (action.type === 'ADD_GROUP_CHAT') {
    return { ...state, chats: [...state.chats, action.payload] }
  }

  if (action.type === 'ADD_USER_IN_GROUP_CHAT') {
    const { userId, groupChatId } = action.payload

    const updateChats = state.chats.map((chat) => {
      if (chat.id === groupChatId) {
        return {
          ...chat,
          usersId: [...chat.usersId, userId],
        }
      }
      return chat
    })

    return { ...state, chats: updateChats }
  }

  return state
}

// actions creators

export const initGroupChatsState = (chats: Array<GroupChatType>) => {
  return {
    type: 'INIT_GROUP_CHATS_STATE',
    payload: chats,
  }
}

export const addGroupChat = (groupChat: GroupChatType) => {
  return {
    type: 'ADD_GROUP_CHAT',
    payload: groupChat,
  }
}

export const addUserInGroupChat = (userId: string, groupChatId: string) => {
  return {
    type: 'ADD_USER_IN_GROUP_CHAT',
    payload: { userId, groupChatId },
  }
}
