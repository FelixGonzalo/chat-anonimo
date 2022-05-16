import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { UserType } from '../types/user'

export function useUpdateApp() {
  const dispatch = useDispatch()

  const updateApp = () => {
    initCurrentUser()
    updateArrayStateWithlocalDB('users', actionCreators.initUserState)
    updateArrayStateWithlocalDB(
      'groupChats',
      actionCreators.initGroupChatsState
    )
    updateArrayStateWithlocalDB(
      'privateChats',
      actionCreators.initPrivateChatsState
    )
  }

  const initCurrentUser = () => {
    try {
      const userSessionStorage = sessionStorage.getItem('currentUser')
      if (userSessionStorage) {
        const userParse: UserType = JSON.parse(userSessionStorage) || null
        // update currentUser of sessionStorage with the data of localStorage
        const usersLocalStorage: string | null = localStorage.getItem('users')
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

  const updateArrayStateWithlocalDB = (
    itemLocalStorage: string,
    action: any // eslint-disable-line
  ) => {
    try {
      const data: any = localStorage.getItem(itemLocalStorage) // eslint-disable-line
      const currentData = JSON.parse(data)
      dispatch(action(currentData))
    } catch (error) {
      console.error(error)
    }
  }

  return { updateApp }
}
