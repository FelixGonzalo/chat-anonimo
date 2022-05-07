import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../../state'
import { UserList } from '../UserList'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { UserType } from '../../types/user'
import { SearchContainer } from './styles'
import { localStorage_getArray } from '../../utils/localStorage_getArray'
import { Message } from '../UserList/styles'
import { GroupChatType } from '../../types/chat'
import { GroupChatItem } from '../GroupChatItem'

export function Search() {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [filterUsers, setFilterUsers] = useState<Array<UserType>>([])
  const [filterGroupChats, setFilterGroupChats] = useState<
    Array<GroupChatType>
  >([])

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    updateArrayStateWithlocalDB('users', actionCreators.initUserState)
    updateArrayStateWithlocalDB(
      'groupChats',
      actionCreators.initGroupChatsState
    )
    const users = localStorage_getArray('users')
    const groupChats = localStorage_getArray('groupChats')

    if (search.trim() === '') return setFilterUsers([])

    // search users
    const maxResult = 3
    let results = 0
    const searchResult: Array<UserType> = []
    users.forEach((user: UserType) => {
      if (results > maxResult - 1) return
      if (
        user.nick.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
      ) {
        searchResult.push({ ...user })
        results++
      }
    })
    setFilterUsers(searchResult)

    // search group chats
    results = 0
    const searchResult2: Array<GroupChatType> = []
    groupChats.forEach((chat: GroupChatType) => {
      if (results > maxResult - 1) return
      if (
        chat.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
      ) {
        searchResult2.push({ ...chat })
        results++
      }
    })
    setFilterGroupChats(searchResult2)
  }

  const updateArrayStateWithlocalDB = (
    itemLocalStorage: string,
    action: any // eslint-disable-line
  ) => {
    try {
      const data: any = localStorage.getItem(itemLocalStorage) // eslint-disable-line
      const currentData = JSON.parse(data)
      dispatch(action(currentData))
    } catch (error) {
      console.error(error)
    }
  }

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
