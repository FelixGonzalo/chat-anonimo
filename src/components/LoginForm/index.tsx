import { InputNick, Button, FormContainer } from '../../styles/formStyles'
import { useRandomName } from '../../hooks/useRandomName'
import { useLogin } from '../../hooks/useLogin'

export function LoginForm() {
  const [nick, setNick] = useRandomName()
  const { login } = useLogin(nick)

  return (
    <FormContainer onSubmit={login}>
      <InputNick type='text' value={nick} onChange={setNick} />
      <Button>ingresar</Button>
    </FormContainer>
  )
}
