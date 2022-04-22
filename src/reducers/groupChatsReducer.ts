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
    return { ...state, chats: action.payload } || state
  }

  if (action.type === 'ADD_GROUP_CHAT') {
    return { ...state, chats: [...state.chats, action.payload] }
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
