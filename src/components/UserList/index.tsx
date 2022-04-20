import { UserListProps } from './types'
import { User } from '../User'

export function UserList({ users }: UserListProps) {
  if (users.length < 1 || !users) {
    return <p>Sin usuarios</p>
  }

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} id={user.id} nick={user.nick} />
      ))}
    </div>
  )
}
