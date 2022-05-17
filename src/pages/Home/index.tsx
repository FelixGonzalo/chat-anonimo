import { Chat } from '../../components/Chat'
import { GroupChat } from '../../components/GroupChat'
import { Menu } from '../../components/Menu'
import { Wrapper } from '../../styles/GlobalStyles'
import { HomeBody } from './styles'
import { useActiveGroupChat } from '../../hooks/useActiveGroupChat'
import { useActiveChat } from '../../hooks/useActiveChat'

export function Home() {
  const { activeChat } = useActiveChat()
  const { activeGroupChat } = useActiveGroupChat()

  return (
    <Wrapper>
      <HomeBody>
        <div>
          <h1>Chat Anónimo</h1>
          <Menu />
        </div>
        {activeChat.id !== '' || activeGroupChat.id === '' ? (
          <Chat users={activeChat.users} messages={activeChat.messages} />
        ) : (
          <GroupChat />
        )}
      </HomeBody>
    </Wrapper>
  )
}
