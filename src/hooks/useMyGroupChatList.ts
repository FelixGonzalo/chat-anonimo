import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state'
import { GroupChatType } from '../types/chat'
import { useCurrentUser } from './useCurrentUser'

export function useMyGroupChatList() {
  const { currentUser } = useCurrentUser()
  const groupChats = useSelector((state: RootState) => state.groupChats.chats)
  const [myGroupChats, setMyGroupChats] = useState([])

  useEffect(() => {
    if (currentUser) {
      const myChats = groupChats?.filter(
        (chat: GroupChatType) => chat.createdBy === currentUser.id
      )
      setMyGroupChats(myChats)
    }
  }, [groupChats])

  return { myGroupChats }
}
