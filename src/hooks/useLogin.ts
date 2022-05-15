import { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { nanoid } from 'nanoid'
import { localStorage_addItemToArray } from '../utils/localStorage_addItemToArray'

export function useLogin(nick: string) {
  const dispatch = useDispatch()
  const login = (e: SyntheticEvent) => {
    e.preventDefault()
    const newUser = {
      id: nanoid(),
      nick,
      privateChatsId: [],
    }
    dispatch(actionCreators.addUser(newUser))
    dispatch(actionCreators.setCurrentUser(newUser))
    sessionStorage.setItem('currentUser', JSON.stringify(newUser))
    localStorage_addItemToArray(newUser, 'users')
  }
  return { login }
}
