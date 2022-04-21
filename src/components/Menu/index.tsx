import { useSelector } from 'react-redux'
import { PrivateChatList } from '../PrivateChatList'
import { Search } from '../Search'
import { Profile } from '../Profile'
import { UserList } from '../UserList'

export function Menu() {
  const users = useSelector((state: any) => state.users)

  return (
    <div>
      <Profile />
      <PrivateChatList title='Mis chats privados' />
      <UserList users={users} title='Usuarios' />
      <Search />
    </div>
  )
}
