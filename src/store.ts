import { configureStore } from '@reduxjs/toolkit'
import { currentUserReducer } from './reducers/currentUserReducer'
import { usersReducer } from './reducers/usersReducer'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: usersReducer,
  },
})
