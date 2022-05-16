import { UserList } from '../UserList'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { SearchContainer } from './styles'
import { Message } from '../UserList/styles'
import { GroupChatType } from '../../types/chat'
import { GroupChatItem } from '../GroupChatItem'
import { useField } from '../../hooks/useField'
import { useSearchChats } from '../../hooks/useSearchChats'

export function Search() {
  const { value: search, onChange: handleInputSearch } = useField()
  const { handleSearch, filterUsers, filterGroupChats } = useSearchChats(search)

  return (
    <SearchContainer>
      <h2>Buscador</h2>
      <FormContainer onSubmit={handleSearch}>
        <InputNick
          type='text'
          placeholder='busca un chat'
          value={search}
          onChange={handleInputSearch}
        />
        <Button>Buscar</Button>
      </FormContainer>

      {filterUsers.length === 0 && filterGroupChats.length === 0 ? (
        <Message>0/3 usuarios y 0/3 chats grupales</Message>
      ) : (
        <>
          <UserList users={filterUsers} messageNoData=' ' />
          {filterGroupChats.map((chat: GroupChatType) => (
            <GroupChatItem key={chat.id} id={chat.id} name={chat.name} />
          ))}
        </>
      )}
    </SearchContainer>
  )
}
