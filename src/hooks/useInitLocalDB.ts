import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

type actionType = any // eslint-disable-line

export function useInitLocalDB(itemLocalStorage: string, action: actionType) {
  const dispatch = useDispatch()

  const initData = () => {
    try {
      const data: any = localStorage.getItem(itemLocalStorage) // eslint-disable-line
      const currentData = JSON.parse(data)
      dispatch(action(currentData))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    initData()
  }, [])
}
