import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { addGroupChat } from '../../reducers/groupChatsReducer'
import { GroupChat } from '../GroupChat'
import { setCurrentUser } from '../../reducers/currentUserReducer'
import { GroupChatType } from '../../types/chat'
import { UserType } from '../../types/user'
import { ButtonAddChat, CategoryTitle, ChatList } from './styles'
import { localStorage_addItemToArray } from '../../utils/localStorage_addItemToArray'

export function GroupChatList() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  const categories: Array<string> = useSelector(
    (state: any) => state.groupChats.categories
  )
  const groupChats = useSelector((state: any) => state.groupChats.chats)

  const createGroupChat = (category: string) => {
    const newId = nanoid()
    const newChat: GroupChatType = {
      id: newId,
      name: `${category}-${Math.floor(Math.random() * (10000 - 10) + 10)}`,
      createdBy: currentUser.id,
      usersId: [currentUser.id],
      category,
      messages: [],
    }

    dispatch(addGroupChat(newChat))
    localStorage_addItemToArray(newChat, 'groupChats')

    if (!currentUser.groupsChatsId || currentUser.groupsChatsId.length < 1) {
      const updateCurrentUser: UserType = {
        ...currentUser,
        groupsChatsId: [newId],
      }
      dispatch(setCurrentUser(updateCurrentUser))
      return
    }

    const updateCurrentUser: UserType = {
      ...currentUser,
      groupsChatsId: [...currentUser.groupsChatsId, newId],
    }
    dispatch(setCurrentUser(updateCurrentUser))
  }

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
                <GroupChat key={chat.id} id={chat.id} name={chat.name} />
              ))}
          </ChatList>
        </div>
      ))}
    </div>
  )
}
