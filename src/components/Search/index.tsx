import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { UserList } from '../UserList'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { UserType } from '../../types/user'
import { SearchContainer } from './styles'
import { initUserState } from '../../reducers/usersReducer'
import { localStorage_getArray } from '../../utils/localStorage_getArray'

export function Search() {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [filterUsers, setFilterUsers] = useState<Array<UserType>>([])

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    updateUsersWithlocalDB('users', initUserState)
    const users = localStorage_getArray('users')

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

  const updateUsersWithlocalDB = (itemLocalStorage: string, action: any) => {
    try {
      const data: any = localStorage.getItem(itemLocalStorage)
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
