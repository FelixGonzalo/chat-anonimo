import styled from 'styled-components'

export const UserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  cursor: ${(props) => (props.click ? 'pointer' : 'default')};
  color: ${(props) => (props.click ? '#e0e0d0' : '#E4F2E7')};
  font-weight: ${(props) => (props.click ? 'normal' : 'bold')};
  font-size: ${(props) => (props.click ? '1rem' : '1.4rem')};
  &:hover p {
    text-decoration: ${(props) => (props.click ? 'underline' : 'none')};
  }
`

export const ButtonChat = styled.button`
  outline: none;
  border: none;
`

export const UserName = styled.p`
  margin: 5px 0;
`
