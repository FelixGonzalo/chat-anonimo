import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './reducers/currentUserReducer'
import { activeChatReducer } from './reducers/activeChatReducer'
import { activeGroupChatReducer } from './reducers/activeGroupChatReducer'
import { usersReducer } from './reducers/usersReducer'
import { privateChatsReducer } from './reducers/privateChatsReducer'
import { groupChatsReducer } from './reducers/groupChatsReducer'

export const store = configureStore({
  reducer: {
    activeChat: activeChatReducer,
    activeGroupChat: activeGroupChatReducer,
    currentUser: currentUserReducer,
    groupChats: groupChatsReducer,
    privateChats: privateChatsReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
