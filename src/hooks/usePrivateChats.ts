import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserType } from '../types/user'
import { ChatType } from '../types/chat'
import { RootState } from '../state'
import { useUserList } from './useUserList'
import { useCurrentUser } from './useCurrentUser'

export function usePrivateChats() {
  const { currentUser } = useCurrentUser()
  const { otherUsers: users } = useUserList()
  const allPrivateChats = useSelector((state: RootState) => state.privateChats)
  const [privateChats, setPrivateChats] = useState([])

  useEffect(() => {
    if (currentUser) {
      const myChats = allPrivateChats?.filter((chat: ChatType) =>
        currentUser.privateChatsId.includes(chat.id)
      )
      const myUserChats = users.filter((user: UserType) => {
        let band = false
        myChats.forEach((chat: ChatType) => {
          if (chat.usersId.includes(user.id)) {
            band = true
          }
        })
        return band
      })
      setPrivateChats(myUserChats)
    }
  }, [allPrivateChats])

  return { privateChats }
}
