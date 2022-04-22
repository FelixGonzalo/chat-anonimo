import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './reducers/currentUserReducer'
import { activeChatReducer } from './reducers/activeChatReducer'
import { usersReducer } from './reducers/usersReducer'
import { privateChatsReducer } from './reducers/privateChatsReducer'
import { groupChatsReducer } from './reducers/groupChatsReducer'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    activeChat: activeChatReducer,
    users: usersReducer,
    privateChats: privateChatsReducer,
    groupChats: groupChatsReducer,
  },
})
