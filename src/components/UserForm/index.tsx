import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addUser } from '../../reducers/usersReducer'
import { setCurrentUser } from '../../reducers/currentUserReducer'
import { LocalStorage_addItemToArray } from '../../utils/LocalStorage_addItemToArray'

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
      privateChatsId: [],
    }

    if (!userSessionStorage) {
      dispatch(addUser(newUser))
      dispatch(setCurrentUser(newUser))
      sessionStorage.setItem('currentUser', JSON.stringify(newUser))
      LocalStorage_addItemToArray(newUser, 'users')
    }
  }

  return (
    <form onSubmit={loginAsAnonymous}>
      <input type='text' value={nick} onChange={handleInputNick} />
      <button>ingresar</button>
    </form>
  )
}
