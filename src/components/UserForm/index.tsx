import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { actionCreators } from '../../state'
import { localStorage_addItemToArray } from '../../utils/localStorage_addItemToArray'
import { InputNick, Button, FormContainer } from '../../styles/formStyles'

export function UserForm() {
  const dispatch = useDispatch()
  const [nick, setNick] = useState(
    `anonymous${Math.floor(Math.random() * (1000 - 10) + 10)}`
  )

  const handleInputNick = (e: ChangeEvent<HTMLInputElement>) =>
    setNick(e.target.value)

  const loginAsAnonymous = (e: SyntheticEvent) => {
    e.preventDefault()
    const userSessionStorage = sessionStorage.getItem('currentUser') || null

    const newUser = {
      id: nanoid(),
      nick,
      privateChatsId: [],
    }

    if (!userSessionStorage) {
      dispatch(actionCreators.addUser(newUser))
      dispatch(actionCreators.setCurrentUser(newUser))
      sessionStorage.setItem('currentUser', JSON.stringify(newUser))
      localStorage_addItemToArray(newUser, 'users')
    }
  }

  return (
    <FormContainer onSubmit={loginAsAnonymous}>
      <InputNick type='text' value={nick} onChange={handleInputNick} />
      <Button>ingresar</Button>
    </FormContainer>
  )
}
