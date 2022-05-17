import { MessageType } from '../../types/message'
import {
  MessageContainer,
  MessageHeader,
  UserName,
  DateName,
  ButtonDelete,
} from './styles'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useRemoveMessageFromChat } from '../../hooks/useRemoveMessageFromChat'

export function Message({ id, from, removedFor, message, date }: MessageType) {
  const { currentUser } = useCurrentUser()
  const { removeMessage } = useRemoveMessageFromChat(id)

  if (currentUser && from.id === currentUser.id) {
    if (removedFor?.includes(currentUser.id)) {
      return (
        <MessageContainer currentUser={true}>
          mensaje eliminado
        </MessageContainer>
      )
    }

    return (
      <MessageContainer currentUser={true}>
        <MessageHeader>
          <span></span>
          <ButtonDelete onClick={removeMessage}>x</ButtonDelete>
        </MessageHeader>
        <p>{message}</p>

        <DateName>{new Date(date).toLocaleString()}</DateName>
      </MessageContainer>
    )
  }

  if (currentUser && removedFor?.includes(currentUser.id)) {
    return (
      <MessageContainer currentUser={false}>mensaje eliminado</MessageContainer>
    )
  }

  return (
    <MessageContainer currentUser={false}>
      <MessageHeader>
        <UserName>{from.nick}</UserName>
        <ButtonDelete onClick={removeMessage}>x</ButtonDelete>
      </MessageHeader>
      <p>{message}</p>
      <DateName>{new Date(date).toLocaleString()}</DateName>
    </MessageContainer>
  )
}
