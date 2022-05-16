import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { localStorage_updateItemToArray } from '../utils/localStorage_updateItemToArray'
import { UserType } from '../types/user'

export function useEditUser() {
  const dispatch = useDispatch()

  const editUser = (nick: string) => {
    const userSessionStorage = sessionStorage.getItem('currentUser') || null
    if (userSessionStorage) {
      const userUpdate: UserType = JSON.parse(userSessionStorage)
      userUpdate.nick = nick

      dispatch(actionCreators.setCurrentUser(userUpdate))
      dispatch(actionCreators.updateNickOfUser(userUpdate.id, nick))
      sessionStorage.setItem('currentUser', JSON.stringify(userUpdate))
      localStorage_updateItemToArray(userUpdate, 'users')
    }
  }

  return { editUser }
}
