import { UserListProps } from './types'
import { UserType } from '../../types/user'
import { useSelector } from 'react-redux'
import { User } from '../User'

export function UserList({ users }: UserListProps) {
  const currentUser: UserType | null = useSelector(
    (state: any) => state.currentUser
  )

  if (users.length < 1 || !users) {
    return <p>Sin usuarios</p>
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {currentUser && user.id !== currentUser.id && (
            <User
              id={user.id}
              nick={user.nick}
              privateChatsId={user.privateChatsId}
            />
          )}
        </div>
      ))}
    </div>
  )
}
