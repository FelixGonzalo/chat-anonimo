import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initUserState } from '../reducers/usersReducer'

export function useInitLocalDB(itemLocalStorage: string) {
  const dispatch = useDispatch()

  const initData = () => {
    try {
      const usersLocalStorage: any = localStorage.getItem(itemLocalStorage)
      const currentUsers = JSON.parse(usersLocalStorage)
      dispatch(initUserState(currentUsers))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    initData()
  }, [])
}
