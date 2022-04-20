import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useInitLocalDB(itemLocalStorage: string, action: any) {
  const dispatch = useDispatch()

  const initData = () => {
    try {
      const data: any = localStorage.getItem(itemLocalStorage)
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
