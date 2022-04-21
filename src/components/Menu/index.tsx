import { useSelector } from 'react-redux'
import { PrivateChatList } from '../PrivateChatList'
import { Search } from '../Search'
import { Profile } from '../Profile'
import { UserList } from '../UserList'
import { MenuContainer } from './styles'

export function Menu() {
  const users = useSelector((state: any) => state.users)

  return (
    <MenuContainer>
      <Profile />
      <Search />
      <PrivateChatList title='Mis chats privados' />
      <UserList users={users} title='Usuarios' />
    </MenuContainer>
  )
}
