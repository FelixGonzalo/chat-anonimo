import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './reducers/currentUserReducer'
import { activeChatReducer } from './reducers/activeChatReducer'
import { activeGroupChatReducer } from './reducers/activeGroupChatReducer'
import { usersReducer } from './reducers/usersReducer'
import { privateChatsReducer } from './reducers/privateChatsReducer'
import { groupChatsReducer } from './reducers/groupChatsReducer'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    activeChat: activeChatReducer,
    activeGroupChat: activeGroupChatReducer,
    users: usersReducer,
    privateChats: privateChatsReducer,
    groupChats: groupChatsReducer,
  },
})
