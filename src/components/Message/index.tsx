import { useSelector } from 'react-redux'
import { MessageType } from '../../types/message'
import { MessageContainer, UserName, DateName } from './styles'

export function Message({ from, to, message, date }: MessageType) {
  const currentUser = useSelector((state: any) => state.currentUser)

  if (from.id === currentUser.id) {
    return (
      <MessageContainer currentUser={true}>
        <p>{message}</p>
        <DateName>{new Date(date).toLocaleString()}</DateName>
      </MessageContainer>
    )
  }
  return (
    <MessageContainer currentUser={false}>
      <UserName>{from.nick}</UserName>
      <p>{message}</p>
      <DateName>{new Date(date).toLocaleString()}</DateName>
    </MessageContainer>
  )
}
