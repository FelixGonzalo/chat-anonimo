import { useSelector } from 'react-redux'
import { RootState } from '../state'
import { ActiveGroupChatType } from '../types/chat'

export function useActiveGroupChat() {
  const activeGroupChat: ActiveGroupChatType = useSelector(
    (state: RootState) => state.activeGroupChat
  )

  return { activeGroupChat }
}
