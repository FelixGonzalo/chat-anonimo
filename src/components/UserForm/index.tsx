import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addUser } from '../../reducers/usersReducer'
import { setCurrentUser } from '../../reducers/currentUserReducer'
import { UserProps } from '../User/types'

export function UserForm() {
  const dispatch = useDispatch()
  const [nick, setNick] = useState('anonymous')

  const handleInputNick = (e: ChangeEvent<HTMLInputElement>) =>
    setNick(e.target.value)

  const loginAsAnonymous = (e: SyntheticEvent) => {
    e.preventDefault()
    const userSessionStorage = sessionStorage.getItem('currentUser') || null
    const newUser = {
      id: nanoid(),
      nick,
    }

    if (!userSessionStorage) {
      dispatch(addUser(newUser))
      dispatch(setCurrentUser(newUser))
      sessionStorage.setItem('currentUser', JSON.stringify(newUser))
      saveUsersInLocalStorage(newUser)
    }
  }

  const saveUsersInLocalStorage = (user: UserProps) => {
    try {
      const usersLocalStorage = localStorage.getItem('users') || null

      if (!usersLocalStorage) {
        return localStorage.setItem('users', JSON.stringify([user]))
      }

      const currentUsers = JSON.parse(usersLocalStorage)
      if (!Array.isArray(currentUsers)) {
        return localStorage.setItem('users', JSON.stringify([user]))
      }

      localStorage.setItem('users', JSON.stringify([...currentUsers, user]))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={loginAsAnonymous}>
      <input type='text' value={nick} onChange={handleInputNick} />
      <button>ingresar</button>
    </form>
  )
}
