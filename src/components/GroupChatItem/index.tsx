import { useDispatch, useSelector } from 'react-redux'
import { setActiveChat } from '../../reducers/activeChatReducer'
import { setActiveGroupChat } from '../../reducers/activeGroupChatReducer'
import { setCurrentUser } from '../../reducers/currentUserReducer'
import { addUserInGroupChat } from '../../reducers/groupChatsReducer'
import { ActiveGroupChatType, GroupChatType } from '../../types/chat'
import { UserType } from '../../types/user'
import { localStorage_getArray } from '../../utils/localStorage_getArray'
import { localStorage_updateItemToArray } from '../../utils/localStorage_updateItemToArray'
import { updateUsersInLocalStorage } from '../../utils/updateUsersInLocalStorage'
import { GroupChatContainer } from './styles'

export function GroupChatItem({ id, name }: { id: string; name: string }) {
  const dispatch = useDispatch()
  const currentUser: UserType | null = useSelector(
    (state: any) => state.currentUser
  )

  const openChat = () => {
    if (currentUser) {
      // search groupChat with currentUser and this user
      const groupChats = localStorage_getArray('groupChats')

      const thisGroupChat: GroupChatType = groupChats.find(
        (chat: GroupChatType) => chat.id === id
      )

      if (thisGroupChat) {
        // add currentUser if not exists in this group chat
        if (!thisGroupChat.usersId.includes(currentUser.id)) {
          thisGroupChat.usersId = [...thisGroupChat.usersId, currentUser.id] // add currentUser if not exists
          updateUsersInLocalStorage(currentUser.id, id) // update users in localstorage
          localStorage_updateItemToArray(thisGroupChat, 'groupChats') // update groupChats in localstorage
          // update currentUser in session storage with this group chat
          // update currentUser in redux

          if (
            currentUser.groupsChatsId &&
            currentUser.groupsChatsId.length > 0
          ) {
            const updateCurrentUser: UserType = {
              ...currentUser,
              groupsChatsId: [...currentUser.groupsChatsId, id],
            }
            dispatch(setCurrentUser(updateCurrentUser))
            sessionStorage.setItem(
              'currentUser',
              JSON.stringify(updateCurrentUser)
            )
          } else {
            const updateCurrentUser: UserType = {
              ...currentUser,
              groupsChatsId: [id],
            }
            dispatch(setCurrentUser(updateCurrentUser))
            sessionStorage.setItem(
              'currentUser',
              JSON.stringify(updateCurrentUser)
            )
          }

          // update groupChats in redux
          dispatch(addUserInGroupChat(currentUser.id, id))
          // update users in redux no need
        }

        // get the data of all the users of the group chat
        const usersLocal = localStorage_getArray('users')

        const usersInGroupChat: Array<UserType> = thisGroupChat.usersId.map(
          (userId) => {
            const userData = usersLocal.find((user) => user.id === userId)
            if (userData) return userData
            // should always find the user
            return {
              id: userId,
              nick: '999999999999999',
              privateChatsId: [],
              groupsChatsId: [],
            }
          }
        )

        const activeGroupChat: ActiveGroupChatType = {
          ...thisGroupChat,
          users: usersInGroupChat,
        }

        // active groupChat and  disable privateChat
        dispatch(setActiveGroupChat(activeGroupChat))
        dispatch(
          setActiveChat({
            id: '',
            users: [],
            messages: [],
          })
        )
      }
    }
  }

  return (
    <GroupChatContainer onClick={openChat}>
      🌎 <span>{name}</span>
    </GroupChatContainer>
  )
}
