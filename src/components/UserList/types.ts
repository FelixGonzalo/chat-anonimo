import { UserType } from '../../types/user'

export type UserListProps = {
  title?: string
  users: Array<UserType>
  messageNoData?: string
}
