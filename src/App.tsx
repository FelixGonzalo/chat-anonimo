import { useSelector } from 'react-redux'
import { UserList } from './components/UserList'
import { UserForm } from './components/UserForm'
import { User } from './components/User'
import { useInitLocalDB } from './hooks/useInitLocalDB'
import { useGetCurrentUser } from './hooks/useGetCurrentUser'

function App() {
  const users = useSelector((state: any) => state.users)
  const { currentUser } = useGetCurrentUser()

  useInitLocalDB('users')

  return (
    <div className='App'>
      <h1>Chat Anónimo</h1>

      {currentUser ? (
        <User id={currentUser.id} nick={currentUser.nick} />
      ) : (
        <UserForm />
      )}

      <h2>Lista de usuarios actuales</h2>
      <UserList users={users} />
    </div>
  )
}

export default App
