import { useSelector } from 'react-redux'
import { RootState } from '../../state'
import { PrivateChatList } from '../PrivateChatList'
import { Search } from '../Search'
import { Profile } from '../Profile'
import { UserList } from '../UserList'
import { MenuContainer } from './styles'
import { GroupChatList } from '../GroupChatList'
import { MyGroupChatsList } from '../MyGroupChatsList'

export function Menu() {
  const users = useSelector((state: RootState) => state.users)

  return (
    <MenuContainer>
      <Profile />
      <Search />
      <PrivateChatList title='Mis chats privados' />
      <MyGroupChatsList />
      <UserList users={users} title='Usuarios' />
      <GroupChatList />
    </MenuContainer>
  )
}
