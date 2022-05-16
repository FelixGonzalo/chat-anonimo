import { useSelector } from 'react-redux'
import { UserType } from '../types/user'
import { RootState } from '../state'
import { useCurrentUser } from './useCurrentUser'

export function useUserList() {
  const allUsers = useSelector((state: RootState) => state.users)
  const { currentUser } = useCurrentUser()

  const otherUsers = () => {
    if (!currentUser) return []
    return allUsers.filter((user: UserType) => user.id !== currentUser.id)
  }

  return { allUsers, otherUsers: otherUsers() }
}
