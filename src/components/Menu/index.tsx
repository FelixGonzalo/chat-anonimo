import { PrivateChatList } from '../PrivateChatList'
import { Search } from '../Search'
import { Profile } from '../Profile'
import { UserList } from '../UserList'
import { MenuContainer } from './styles'
import { GroupChatList } from '../GroupChatList'
import { MyGroupChatsList } from '../MyGroupChatsList'
import { useUserList } from '../../hooks/useUserList'

export function Menu() {
  const { otherUsers } = useUserList()

  return (
    <MenuContainer>
      <Profile />
      <Search />
      <PrivateChatList title='Mis chats privados' />
      <MyGroupChatsList />
      <UserList users={otherUsers} title='Usuarios' />
      <GroupChatList />
    </MenuContainer>
  )
}
