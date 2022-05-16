import { useSelector } from 'react-redux'
import { RootState } from '../state'
import { UserType } from '../types/user'

export function useCurrentUser() {
  const currentUser: UserType | null = useSelector(
    (state: RootState) => state.currentUser
  )

  return { currentUser }
}
