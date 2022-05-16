import { useCreateGroupChat } from '../../hooks/useCreateGroupChat'
import { useGroupChats } from '../../hooks/useGroupChats'
import { GroupChatItem } from '../GroupChatItem'
import { GroupChatType } from '../../types/chat'
import { ButtonAddChat, CategoryTitle, ChatList } from './styles'

export function GroupChatList() {
  const { categories, groupChats } = useGroupChats()
  const { createGroupChat } = useCreateGroupChat()

  return (
    <div>
      <h2>Chats grupales</h2>
      {categories.map((category) => (
        <div key={category}>
          <ButtonAddChat onClick={() => createGroupChat(category)}>
            +
          </ButtonAddChat>
          <CategoryTitle> {category}</CategoryTitle>
          <ChatList>
            {groupChats
              .filter((chat: GroupChatType) => chat.category === category)
              .map((chat: GroupChatType) => (
                <GroupChatItem key={chat.id} id={chat.id} name={chat.name} />
              ))}
          </ChatList>
        </div>
      ))}
    </div>
  )
}
