import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/currentUserReducer'
import { UserType } from '../types/user'

export function useInitCurrentUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const userSessionStorage: any = sessionStorage.getItem('currentUser')
      if (userSessionStorage) {
        const userParse: UserType = JSON.parse(userSessionStorage) || null
        // update currentUser of sessionStorage with the data of localStorage
        const usersLocalStorage: any = localStorage.getItem('users')
        const usersParse: Array<UserType> =
          JSON.parse(usersLocalStorage) || null
        const userUpdate = usersParse.find((user) => user.id === userParse.id)
        if (userUpdate) {
          sessionStorage.setItem('currentUser', JSON.stringify(userUpdate))
          dispatch(setCurrentUser(userUpdate))
        } else {
          dispatch(setCurrentUser(userParse))
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
  }, [])
}
