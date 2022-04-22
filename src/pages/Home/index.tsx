import { useSelector } from 'react-redux'
import { Chat } from '../../components/Chat'
import { GroupChat } from '../../components/GroupChat'
import { Menu } from '../../components/Menu'
import { Wrapper } from '../../styles/GlobalStyles'
import { HomeBody } from './styles'

export function Home() {
  const activeChat = useSelector((state: any) => state.activeChat)
  const activeGroupChat = useSelector((state: any) => state.activeGroupChat)

  return (
    <Wrapper>
      <HomeBody>
        <div>
          <h1>Chat Anónimo</h1>
          <Menu />
        </div>
        {activeChat.id === '' && activeGroupChat.id === '' ? (
          <Chat users={activeChat.users} messages={activeChat.messages} />
        ) : activeChat.id !== '' ? (
          <Chat users={activeChat.users} messages={activeChat.messages} />
        ) : (
          <GroupChat />
        )}
      </HomeBody>
    </Wrapper>
  )
}
