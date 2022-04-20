import styled from 'styled-components'

export const MessageContainer = styled.div`
  padding: 5px 10px;
  margin-left: ${(props) => (props.currentUser ? '0' : '5%')};
  margin-right: ${(props) => (props.currentUser ? '5%' : '0')};
  color: #e4f2e7;
  background: ${(props) => (props.currentUser ? '#418585' : '#2D3E40')};
  box-sizing: border-box;
  border-radius: 3px;
`
