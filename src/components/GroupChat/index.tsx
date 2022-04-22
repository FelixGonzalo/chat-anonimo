import { GroupChatContainer } from './styles'

export function GroupChat({ id, name }: { id: string; name: string }) {
  return (
    <GroupChatContainer>
      🌎 <span>{name}</span>
    </GroupChatContainer>
  )
}
