import { UserListProps } from './types'
import { UserType } from '../../types/user'
import { useSelector } from 'react-redux'
import { User } from '../User'
import { Message } from './styles'

export function UserList({ title, users }: UserListProps) {
  const currentUser: UserType | null = useSelector(
    (state: any) => state.currentUser
  )

  if (users.length < 1 || !users) {
    return (
      <div>
        <h2>{title}</h2>
        <Message>Sin usuarios</Message>
      </div>
    )
  }

  return (
    <div>
      {title && <h2>{title}</h2>}

      {users.map((user) => (
        <div key={user.id}>
          {user.id !== currentUser?.id && (
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
