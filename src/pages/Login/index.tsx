import { LoginForm } from '../../components/LoginForm'
import { Wrapper } from '../../styles/GlobalStyles'
import { LoginContainer } from './styles'

export function Login() {
  return (
    <Wrapper>
      <LoginContainer>
        <h1>Chat Anónimo 🥷</h1>
        <LoginForm />
      </LoginContainer>
    </Wrapper>
  )
}
