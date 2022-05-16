import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { GroupChatType } from '../types/chat'
import { UserType } from '../types/user'
import { localStorage_addItemToArray } from '../utils/localStorage_addItemToArray'
import { updateUsersInLocalStorage } from '../utils/updateUsersInLocalStorage'
import { useCurrentUser } from './useCurrentUser'

export function useCreateGroupChat() {
  const { currentUser } = useCurrentUser()
  const dispatch = useDispatch()

  const createGroupChat = (category: string) => {
    if (!currentUser) return

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

  return { createGroupChat }
}
