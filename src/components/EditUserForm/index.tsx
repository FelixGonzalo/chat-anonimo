import { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateNickOfUser } from '../../reducers/usersReducer'
import { setCurrentUser } from '../../reducers/currentUserReducer'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { localStorage_updateItemToArray } from '../../utils/localStorage_updateItemToArray'

export function EditUserForm({ onSubmit }: { onSubmit: any }) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  const users = useSelector((state: any) => state.users)

  const [nick, setNick] = useState(currentUser?.nick || '')

  const handleInputNick = (e: ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const userSessionStorage = sessionStorage.getItem('currentUser') || null
    if (userSessionStorage) {
      const userUpdate: any = JSON.parse(userSessionStorage)
      userUpdate.nick = nick

      dispatch(setCurrentUser(userUpdate))
      dispatch(updateNickOfUser(currentUser.id, nick))
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
