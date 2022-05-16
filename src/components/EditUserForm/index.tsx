import { SyntheticEvent } from 'react'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useEditUser } from '../../hooks/useEditUser'
import { useField } from '../../hooks/useField'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'

type EditUserFormProps = {
  closeForm: any // eslint-disable-line
}

export function EditUserForm({ closeForm }: EditUserFormProps) {
  const { currentUser } = useCurrentUser()
  const { editUser } = useEditUser()
  const { value: nick, onChange: handleInputNick } = useField(
    currentUser?.nick || ''
  )

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    editUser(nick)
    closeForm()
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputNick type='text' value={nick} onChange={handleInputNick} />
      <Button>Editar</Button>
    </FormContainer>
  )
}
