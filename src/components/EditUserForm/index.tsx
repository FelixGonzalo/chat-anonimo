import { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, actionCreators } from '../../state'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { UserType } from '../../types/user'
import { localStorage_updateItemToArray } from '../../utils/localStorage_updateItemToArray'

type EditUserFormProps = {
  onSubmit: any // eslint-disable-line
}

export function EditUserForm({ onSubmit }: EditUserFormProps) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.currentUser)

  const [nick, setNick] = useState(currentUser?.nick || '')

  const handleInputNick = (e: ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const userSessionStorage = sessionStorage.getItem('currentUser') || null
    if (userSessionStorage) {
      const userUpdate: UserType = JSON.parse(userSessionStorage)
      userUpdate.nick = nick

      dispatch(actionCreators.setCurrentUser(userUpdate))
      dispatch(actionCreators.updateNickOfUser(currentUser.id, nick))
      sessionStorage.setItem('currentUser', JSON.stringify(userUpdate))
      localStorage_updateItemToArray(userUpdate, 'users')
    }
    onSubmit()
  }

  useEffect(() => {
    setNick(currentUser?.nick || '')
  }, [currentUser])

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputNick type='text' value={nick} onChange={handleInputNick} />
      <Button>Editar</Button>
    </FormContainer>
  )
}
