import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { RootState, actionCreators } from '../../state'
import { GroupChatItem } from '../GroupChatItem'
import { GroupChatType } from '../../types/chat'
import { UserType } from '../../types/user'
import { ButtonAddChat, CategoryTitle, ChatList } from './styles'
import { localStorage_addItemToArray } from '../../utils/localStorage_addItemToArray'
import { updateUsersInLocalStorage } from '../../utils/updateUsersInLocalStorage'

export function GroupChatList() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const categories: Array<string> = useSelector(
    (state: RootState) => state.groupChats.categories
  )
  const groupChats = useSelector((state: RootState) => state.groupChats.chats)

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

    dispatch(actionCreators.addGroupChat(newChat)) // update groupChats in redux
    localStorage_addItemToArray(newChat, 'groupChats') // update groupChats in localstorage
    updateUsersInLocalStorage(currentUser.id, newChat.id) // update users in localstorage

    // update currentUser in session storage with this group chat
    // update currentUser in redux
    if (!currentUser.groupsChatsId || currentUser.groupsChatsId.length < 1) {
      const updateCurrentUser: UserType = {
        ...currentUser,
        groupsChatsId: [newId],
      }
      dispatch(actionCreators.setCurrentUser(updateCurrentUser))
      sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUser))
      return
    }

    const updateCurrentUser: UserType = {
      ...currentUser,
      groupsChatsId: [...currentUser.groupsChatsId, newId],
    }
    dispatch(actionCreators.setCurrentUser(updateCurrentUser))
    sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUser))

    // active groupChat and  disable privateChat
    dispatch(actionCreators.setActiveGroupChat({ ...newChat, users: [] }))
    dispatch(
      actionCreators.setActiveChat({
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
