import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GroupChatType } from '../../types/chat'
import { GroupChat } from '../GroupChat'
import { Message } from '../GroupChatList/styles'

export function MyGroupChatsList() {
  const currentUser = useSelector((state: any) => state.currentUser)
  const groupChats = useSelector((state: any) => state.groupChats.chats)
  const [myGroupChats, setMyGroupChats] = useState([])

  useEffect(() => {
    if (currentUser) {
      const myChats = groupChats?.filter(
        (chat: GroupChatType) => chat.createdBy === currentUser.id
      )
      setMyGroupChats(myChats)
    }
  }, [groupChats])

  if (myGroupChats.length < 1) {
    return (
      <div>
        <h2>Mis chats grupales</h2>
        <Message>no has creado ningún chat de grupo</Message>
      </div>
    )
  }

  return (
    <div>
      <h2>Mis chats grupales</h2>
      {myGroupChats.map((chat: GroupChatType) => (
        <GroupChat key={chat.id} id={chat.id} name={chat.name} />
      ))}
    </div>
  )
}
