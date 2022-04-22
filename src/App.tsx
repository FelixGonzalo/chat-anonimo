import { useSelector } from 'react-redux'
import { useInitLocalDB } from './hooks/useInitLocalDB'
import { useInitCurrentUser } from './hooks/useInitCurrentUser'
import { initUserState } from './reducers/usersReducer'
import { initPrivateChatsState } from './reducers/privateChatsReducer'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { initGroupChatsState } from './reducers/groupChatsReducer'

function App() {
  const currentUser = useSelector((state: any) => state.currentUser)
  useInitCurrentUser()
  useInitLocalDB('users', initUserState)
  useInitLocalDB('privateChats', initPrivateChatsState)
  useInitLocalDB('groupChats', initGroupChatsState)

  if (!currentUser) return <Login />
  return <Home />
}

export default App
