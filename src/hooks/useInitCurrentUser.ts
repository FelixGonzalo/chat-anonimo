import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { UserType } from '../types/user'

export function useInitCurrentUser() {
  const dispatch = useDispatch()

  const initCurrentUser = () => {
    try {
      const userSessionStorage = sessionStorage.getItem('currentUser')
      if (userSessionStorage) {
        const userParse: UserType = JSON.parse(userSessionStorage) || null
        // update currentUser of sessionStorage with the data of localStorage
        const usersLocalStorage = localStorage.getItem('users')
        if (!usersLocalStorage) return
        const usersParse: Array<UserType> =
          JSON.parse(usersLocalStorage) || null
        const userUpdate = usersParse.find((user) => user.id === userParse.id)
        if (userUpdate) {
          sessionStorage.setItem('currentUser', JSON.stringify(userUpdate))
          dispatch(actionCreators.setCurrentUser(userUpdate))
        } else {
          dispatch(actionCreators.setCurrentUser(userParse))
        }
      }
    } catch (error) {
      if (sessionStorage.getItem('currentUser')) {
        sessionStorage.removeItem('currentUser')
        console.error('Current user removed from session storage', error)
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    initCurrentUser()
  }, [])
}
