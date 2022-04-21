import { useSelector } from 'react-redux'
import { UserList } from './components/UserList'
import { Chat } from './components/Chat'
import { useInitLocalDB } from './hooks/useInitLocalDB'
import { useInitCurrentUser } from './hooks/useInitCurrentUser'
import { initUserState } from './reducers/usersReducer'
import { initPrivateChatsState } from './reducers/privateChatsReducer'
import { Wrapper } from './styles/GlobalStyles'
import { PrivateChatList } from './components/PrivateChatList'
import { Profile } from './components/Profile'
import { Search } from './components/Search'

function App() {
  const currentUser = useSelector((state: any) => state.currentUser)
  const users = useSelector((state: any) => state.users)
  const activeChat = useSelector((state: any) => state.activeChat)
  useInitCurrentUser()

  useInitLocalDB('users', initUserState)
  useInitLocalDB('privateChats', initPrivateChatsState)

  if (!currentUser) {
    return (
      <Wrapper>
        <h1>Chat Anónimo</h1>
        <Profile />
        <UserList users={users} title='Usuarios' />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h1>Chat Anónimo</h1>
      <Profile />
      <PrivateChatList title='Mis chats privados' />
      <UserList users={users} title='Usuarios' />
      <Search />
      {activeChat.id !== '' ? (
        <>
          <h2>Chat</h2>
          <Chat users={activeChat.users} messages={activeChat.messages} />
        </>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

export default App
