import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserList } from '../UserList'
import { UserType } from '../../types/user'
import { ChatType } from '../../types/chat'
import { RootState } from '../../state'

export function PrivateChatList({ title }: { title: string }) {
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const users = useSelector((state: RootState) => state.users)
  const privateChats = useSelector((state: RootState) => state.privateChats)
  const [userChats, setUserChats] = useState([])

  useEffect(() => {
    if (currentUser) {
      const myChats = privateChats?.filter((chat: ChatType) =>
        currentUser.privateChatsId.includes(chat.id)
      )

      const userChats = users.filter((user: UserType) => {
        let band = false
        myChats.forEach((chat: ChatType) => {
          if (chat.usersId.includes(user.id)) {
            band = true
          }
        })
        return band
      })
      setUserChats(userChats)
    }
  }, [privateChats])

  return <UserList users={userChats} title={title} />
}
