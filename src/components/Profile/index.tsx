import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, actionCreators } from '../../state'
import { UserType } from '../../types/user'
import { EditUserForm } from '../EditUserForm'
import { User } from '../User'
import { ButtonEdit, ButtonUpdate } from './styles'

export function Profile() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const [editUser, setEditUser] = useState(false)

  const updateChat = () => {
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

  return (
    <>
      {editUser && <EditUserForm onSubmit={() => setEditUser(false)} />}

      {currentUser && (
        <>
          {!editUser && (
            <User
              id={currentUser.id}
              nick={currentUser.nick}
              privateChatsId={currentUser.privateChatsId}
            />
          )}

          <ButtonEdit onClick={() => setEditUser(!editUser)}>
            {editUser ? 'X' : 'editar'}
          </ButtonEdit>
          <ButtonUpdate onClick={updateChat}>actualizar menu</ButtonUpdate>
        </>
      )}
    </>
  )
}
