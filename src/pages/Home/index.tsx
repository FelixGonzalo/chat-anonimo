import { useSelector } from 'react-redux'
import { Chat } from '../../components/Chat'
import { Menu } from '../../components/Menu'
import { Wrapper } from '../../styles/GlobalStyles'
import { HomeBody } from './styles'

export function Home() {
  const activeChat = useSelector((state: any) => state.activeChat)

  return (
    <Wrapper>
      <HomeBody>
        <div>
          <h1>Chat Anónimo</h1>
          <Menu />
        </div>
        {activeChat.id !== '' ? (
          <Chat users={activeChat.users} messages={activeChat.messages} />
        ) : (
          <Chat users={activeChat.users} messages={activeChat.messages} />
        )}
      </HomeBody>
    </Wrapper>
  )
}
