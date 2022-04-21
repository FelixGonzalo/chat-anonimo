import styled from 'styled-components'

export const MessageContainer = styled.div`
  padding: 5px 10px;
  margin-left: ${(props) => (props.currentUser ? '5%' : '')};
  margin-right: ${(props) => (props.currentUser ? '0' : '5%')};
  color: #e4f2e7;
  background: ${(props) => (props.currentUser ? '#2D3E40' : '#418585')};
  box-sizing: border-box;
  border-radius: 3px;
`

export const UserName = styled.span`
  font-size: 0.8rem;
`

export const DateName = styled.span`
  display: block;
  text-align: right;
  font-size: 0.65rem;
`
