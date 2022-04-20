import { MessageContainer } from './styles'
import { MessageProps } from './types'
import { useSelector } from 'react-redux'

export function Message({ user_from, user_to, message, date }: MessageProps) {
  const currentUser = useSelector((state: any) => state.currentUser)

  if (user_from.id === currentUser.id) {
    return (
      <MessageContainer currentUser={true}>
        <span>{currentUser.nick}</span>
        <p>{message}</p>
        <span>{date}</span>
      </MessageContainer>
    )
  }

  return (
    <MessageContainer currentUser={false}>
      <span>{user_to.nick}</span>
      <p>{message}</p>
      <span>{date}</span>
    </MessageContainer>
  )
}
