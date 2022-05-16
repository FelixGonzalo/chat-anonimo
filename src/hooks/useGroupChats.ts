import { useSelector } from 'react-redux'
import { RootState } from '../state'

export function useGroupChats() {
  const categories: Array<string> = useSelector(
    (state: RootState) => state.groupChats.categories
  )
  const groupChats = useSelector((state: RootState) => state.groupChats.chats)

  return { categories, groupChats }
}
