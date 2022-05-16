import { UserListProps } from './types'
import { User } from '../User'
import { Message } from './styles'

export function UserList({ title, users, messageNoData }: UserListProps) {
  if (!users || users.length < 1) {
    return (
      <div>
        <h2>{title}</h2>
        <Message>{messageNoData ? messageNoData : 'Sin usuarios'}</Message>
      </div>
    )
  }

  return (
    <div>
      {title && <h2>{title}</h2>}
      {users.map((user) => (
        <User
          key={user.id}
          id={user.id}
          nick={user.nick}
          privateChatsId={user.privateChatsId}
        />
      ))}
    </div>
  )
}
