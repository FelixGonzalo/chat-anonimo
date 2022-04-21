import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserList } from '../UserList'
import { UserType } from '../../types/user'
import { PrivateChatType } from '../../types/privateChat'

export function PrivateChatList({ title }: { title: string }) {
  const currentUser = useSelector((state: any) => state.currentUser)
  const users = useSelector((state: any) => state.users)
  const privateChats = useSelector((state: any) => state.privateChats)
  const [userChats, setUserChats] = useState([])

  useEffect(() => {
    if (currentUser) {
      const myChats = privateChats?.filter((chat: any) =>
        currentUser.privateChatsId.includes(chat.id)
      )

      const userChats = users.filter((user: UserType) => {
        let band = false
        myChats.forEach((chat: PrivateChatType) => {
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
