import { useSelector } from 'react-redux'
import { RootState, actionCreators } from './state'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { useInitLocalDB } from './hooks/useInitLocalDB'
import { useInitCurrentUser } from './hooks/useInitCurrentUser'

function App() {
  const currentUser = useSelector((state: RootState) => state.currentUser)
  useInitCurrentUser()
  useInitLocalDB('users', actionCreators.initUserState)
  useInitLocalDB('privateChats', actionCreators.initPrivateChatsState)
  useInitLocalDB('groupChats', actionCreators.initGroupChatsState)

  if (!currentUser) return <Login />
  return <Home />
}

export default App
