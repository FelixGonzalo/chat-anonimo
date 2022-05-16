import { useMyGroupChatList } from '../../hooks/useMyGroupChatList'
import { GroupChatType } from '../../types/chat'
import { GroupChatItem } from '../GroupChatItem'
import { Message } from '../GroupChatList/styles'

export function MyGroupChatsList() {
  const { myGroupChats } = useMyGroupChatList()

  if (myGroupChats.length < 1) {
    return (
      <div>
        <h2>Mis chats grupales</h2>
        <Message>no has creado ningún chat de grupo</Message>
      </div>
    )
  }

  return (
    <div>
      <h2>Mis chats grupales</h2>
      {myGroupChats.map((chat: GroupChatType) => (
        <GroupChatItem key={chat.id} id={chat.id} name={chat.name} />
      ))}
    </div>
  )
}
