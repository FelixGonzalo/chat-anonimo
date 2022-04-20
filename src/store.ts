import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './reducers/currentUserReducer'
import { usersReducer } from './reducers/usersReducer'
import { privateChatsReducer } from './reducers/privateChatsReducer'
import { activeChatReducer } from './reducers/activeChatReducer'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    activeChat: activeChatReducer,
    users: usersReducer,
    privateChats: privateChatsReducer,
  },
})
