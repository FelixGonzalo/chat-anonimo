import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { addGroupChat } from '../../reducers/groupChatsReducer'
import { GroupChatItem } from '../GroupChatItem'
import { setCurrentUser } from '../../reducers/currentUserReducer'
import { GroupChatType } from '../../types/chat'
import { UserType } from '../../types/user'
import { ButtonAddChat, CategoryTitle, ChatList } from './styles'
import { localStorage_addItemToArray } from '../../utils/localStorage_addItemToArray'
import { updateUsersInLocalStorage } from '../../utils/updateUsersInLocalStorage'
import { setActiveChat } from '../../reducers/activeChatReducer'
import { setActiveGroupChat } from '../../reducers/activeGroupChatReducer'

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

    dispatch(addGroupChat(newChat)) // update groupChats in redux
    localStorage_addItemToArray(newChat, 'groupChats') // update groupChats in localstorage
    updateUsersInLocalStorage(currentUser.id, newChat.id) // update users in localstorage

    // update currentUser in session storage with this group chat
    // update currentUser in redux
    if (!currentUser.groupsChatsId || currentUser.groupsChatsId.length < 1) {
      const updateCurrentUser: UserType = {
        ...currentUser,
        groupsChatsId: [newId],
      }
      dispatch(setCurrentUser(updateCurrentUser))
      sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUser))
      return
    }

    const updateCurrentUser: UserType = {
      ...currentUser,
      groupsChatsId: [...currentUser.groupsChatsId, newId],
    }
    dispatch(setCurrentUser(updateCurrentUser))
    sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUser))

    // active groupChat and  disable privateChat
    dispatch(setActiveGroupChat({ ...newChat, users: [] }))
    dispatch(
      setActiveChat({
        id: '',
        users: [],
        messages: [],
      })
    )

    // update users in redux no need
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
                <GroupChatItem key={chat.id} id={chat.id} name={chat.name} />
              ))}
          </ChatList>
        </div>
      ))}
    </div>
  )
}
