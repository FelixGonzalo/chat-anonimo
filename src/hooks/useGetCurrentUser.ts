import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../reducers/currentUserReducer'
import { UserProps } from '../components/User/types'

export function useGetCurrentUser() {
  const currentUser = useSelector((state: any) => state.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const userSessionStorage: any = sessionStorage.getItem('currentUser')
      const userParse: UserProps = JSON.parse(userSessionStorage) || null
      dispatch(setCurrentUser(userParse))
    } catch (error) {
      console.error('Current user removed from session storage', error)
      sessionStorage.removeItem('currentUser')
    }
  }, [])

  return { currentUser }
}
