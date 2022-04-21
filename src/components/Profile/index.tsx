import { useState } from 'react'
import { useSelector } from 'react-redux'
import { EditUserForm } from '../EditUserForm'
import { User } from '../User'
import { UserForm } from '../UserForm'
import { ButtonEdit } from './styles'

export function Profile() {
  const currentUser = useSelector((state: any) => state.currentUser)
  const [editUser, setEditUser] = useState(false)
  return (
    <>
      {editUser && <EditUserForm onSubmit={() => setEditUser(false)} />}

      {currentUser ? (
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
        </>
      ) : (
        <UserForm />
      )}
    </>
  )
}
