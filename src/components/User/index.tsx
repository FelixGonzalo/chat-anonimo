import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { RootState, actionCreators } from '../../state'
import { localStorage_addItemToArray } from '../../utils/localStorage_addItemToArray'
import { UserType } from '../../types/user'
import { ChatType } from '../../types/chat'
import { UserContainer, UserName } from './styles'

export function User({ id, nick }: UserType) {
  const dispatch = useDispatch()
  const currentUser: UserType | null = useSelector(
    (state: RootState) => state.currentUser
  )

  const openChat = () => {
    try {
      if (currentUser) {
        if (id === currentUser.id) {
          return alert('Es tu usuario !!')
        } // the same user

        let activeChat = null

        // search privateChat with currentUser and this user
        const privateChatsLocal: string | null =
          localStorage.getItem('privateChats')
        if (privateChatsLocal) {
          const privateChats: Array<ChatType> = JSON.parse(privateChatsLocal)
          const result = privateChats.filter(
            (chat) =>
              chat.usersId.includes(currentUser.id) && chat.usersId.includes(id)
          )
          if (result.length > 0) {
            activeChat = result[0]
          }
        }

        if (!activeChat) {
          // the two users do not have a active chat
          // creat chat
          const newPrivateChat: ChatType = {
            id: nanoid(),
            usersId: [currentUser.id, id],
            messages: [],
          }
          const updateCurrentUser: UserType = {
            ...currentUser,
            privateChatsId: [...currentUser.privateChatsId, newPrivateChat.id],
          }

          dispatch(actionCreators.addPrivateChat(newPrivateChat))
          dispatch(
            actionCreators.updateChatListOfUser(
              currentUser.id,
              newPrivateChat.id
            )
          )
          dispatch(actionCreators.updateChatListOfUser(id, newPrivateChat.id))
          dispatch(actionCreators.setCurrentUser(updateCurrentUser))

          localStorage_addItemToArray(newPrivateChat, 'privateChats')
          updateUsersInLocalStorage(currentUser.id, newPrivateChat.id)
          updateUsersInLocalStorage(id, newPrivateChat.id)
          sessionStorage.setItem(
            'currentUser',
            JSON.stringify(updateCurrentUser)
          )
          activeChat = newPrivateChat
        } else {
          // update the current User with the active chat of the other user
          const userLocal = getUserByIdFromLocalStorage(currentUser.id)
          if (userLocal) {
            dispatch(actionCreators.setCurrentUser(userLocal))
            sessionStorage.setItem('currentUser', JSON.stringify(userLocal))
          }
        }

        dispatch(
          actionCreators.setActiveChat({
            id: activeChat.id,
            users: [
              {
                id: currentUser.id,
                nick: currentUser.nick,
              },
              {
                id: id,
                nick: nick,
              },
            ],
            messages: activeChat.messages,
          })
        )
        // disable group chat
        dispatch(
          actionCreators.setActiveGroupChat({
            id: '',
            name: '',
            createdBy: '',
            category: '',
            users: [],
            messages: [],
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateUsersInLocalStorage = (userId: string, privateChatId: string) => {
    try {
      const usersLocalStorage: string | null = localStorage.getItem('users')
      if (usersLocalStorage) {
        const usersParse = JSON.parse(usersLocalStorage)
        const usersUpdate = usersParse.map((user: UserType) => {
          if (user.id === userId) {
            if (!user.privateChatsId.includes(privateChatId)) {
              return {
                ...user,
                privateChatsId: [...user.privateChatsId, privateChatId],
              }
            }
          }
          return user
        })
        localStorage.setItem('users', JSON.stringify(usersUpdate))
      }
    } catch (error) {
      console.error('updateUsersInLocalStorage', error)
    }
  }

  const getUserByIdFromLocalStorage = (userId: string) => {
    try {
      const usersLocalStorage: string | null = localStorage.getItem('users')
      if (usersLocalStorage) {
        const usersParse: Array<UserType> = JSON.parse(usersLocalStorage)
        const user = usersParse.find((user) => user.id === userId)
        return user
      }
    } catch (error) {
      console.error('getUserByIdFromLocalStorage', error)
    }
  }

  if (currentUser && currentUser.id !== id) {
    return (
      <UserContainer onClick={openChat} click={true}>
        🥷<UserName> {nick ? nick : 'Sin nombre'}</UserName>
      </UserContainer>
    )
  }

  return (
    <UserContainer click={false}>
      <UserName>🥷 {nick ? nick : 'Sin nombre'}</UserName>
    </UserContainer>
  )
}
