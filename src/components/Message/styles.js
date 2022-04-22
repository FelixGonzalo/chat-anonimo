import styled from 'styled-components'

export const MessageContainer = styled.div`
  padding: 5px 8px;
  padding-right: 5px;
  margin-left: ${(props) => (props.currentUser ? '5%' : '')};
  margin-right: ${(props) => (props.currentUser ? '0' : '5%')};
  color: #e4f2e7;
  background: ${(props) => (props.currentUser ? '#2D3E40' : '#418585')};
  box-sizing: border-box;
  border-radius: 3px;
`

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const UserName = styled.span`
  font-weight: bold;
  font-size: 0.8rem;
`

export const DateName = styled.span`
  display: block;
  text-align: right;
  font-size: 0.65rem;
`

export const ButtonDelete = styled.button`
  display: block;
  padding: 0;
  text-align: right;
  outline: none;
  border: none;
  background: none;
  font-weight: bold;
  cursor: pointer;
  color: #e4f2e7;
`
