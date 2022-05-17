import { useSelector } from 'react-redux'
import { RootState } from '../state'

export function useActiveChat() {
  const activeChat = useSelector((state: RootState) => state.activeChat)

  return { activeChat }
}
