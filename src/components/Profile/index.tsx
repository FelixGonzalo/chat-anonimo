import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useUpdateApp } from '../../hooks/useUpdateApp'
import { useVisible } from '../../hooks/useVisible'
import { EditUserForm } from '../EditUserForm'
import { User } from '../User'
import { ButtonEdit, ButtonUpdate } from './styles'

export function Profile() {
  const { currentUser } = useCurrentUser()
  const { visible: visibleEdit, hide, change } = useVisible(false)
  const { updateApp } = useUpdateApp()

  if (!currentUser) return null

  return (
    <>
      {visibleEdit ? (
        <EditUserForm closeForm={hide} />
      ) : (
        <User
          id={currentUser.id}
          nick={currentUser.nick}
          privateChatsId={currentUser.privateChatsId}
        />
      )}

      <ButtonEdit onClick={change}>{visibleEdit ? 'X' : 'editar'}</ButtonEdit>
      <ButtonUpdate onClick={updateApp}>actualizar menu</ButtonUpdate>
    </>
  )
}
