import { useSelector } from 'react-redux'
import { UserList } from './components/UserList'
import { UserForm } from './components/UserForm'
import { User } from './components/User'
import { Chat } from './components/Chat'
import { useInitLocalDB } from './hooks/useInitLocalDB'
import { useGetCurrentUser } from './hooks/useGetCurrentUser'
import { initUserState } from './reducers/usersReducer'
import { initPrivateChatsState } from './reducers/privateChatsReducer'

function App() {
  const users = useSelector((state: any) => state.users)
  const activeChat = useSelector((state: any) => state.activeChat)
  const { currentUser } = useGetCurrentUser()

  useInitLocalDB('users', initUserState)
  useInitLocalDB('privateChats', initPrivateChatsState)

  return (
    <div className='App'>
      <h1>Chat Anónimo</h1>

      {currentUser ? (
        <User
          id={currentUser.id}
          nick={currentUser.nick}
          privateChatsId={currentUser.privateChatsId}
        />
      ) : (
        <UserForm />
      )}

      <h2>Lista de usuarios actuales</h2>
      <UserList users={users} />

      {activeChat.id !== '' ? (
        <>
          <h2>Chat</h2>
          <Chat users={activeChat.users} messages={[]} />
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default App
