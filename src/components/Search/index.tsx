import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { UserList } from '../UserList'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { UserType } from '../../types/user'
import { SearchContainer } from './styles'

export function Search() {
  const users = useSelector((state: any) => state.users)

  const [search, setSearch] = useState('')
  const [filterUsers, setFilterUsers] = useState<Array<UserType>>([])

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault()
    if (search.trim() === '') return setFilterUsers([])
    const maxResult = 3
    let constResult = 0
    const searchResult: Array<UserType> = []
    users.forEach((user: UserType) => {
      if (constResult > maxResult - 1) return
      if (
        user.nick.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
      ) {
        searchResult.push({ ...user })
        constResult++
      }
    })
    setFilterUsers(searchResult)
  }

  return (
    <SearchContainer>
      <h2>Buscador</h2>
      <FormContainer onSubmit={handleSearch}>
        <InputNick
          type='text'
          placeholder='busca por nick'
          value={search}
          onChange={handleInputSearch}
        />
        <Button>Buscar</Button>
      </FormContainer>
      <UserList
        users={filterUsers}
        messageNoData='Sin resultados de búsqueda'
      />
    </SearchContainer>
  )
}
