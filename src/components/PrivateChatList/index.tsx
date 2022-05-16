import { usePrivateChats } from '../../hooks/usePrivateChats'
import { UserList } from '../UserList'

export function PrivateChatList({ title }: { title: string }) {
  const { privateChats } = usePrivateChats()

  return <UserList users={privateChats} title={title} />
}
