import styled from 'styled-components'

export const ChatContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  padding: 10px;
  background: #336b6b;
  border-radius: 3px;
`

export const ChatHeader = styled.div`
  color: #e4f2e7;
  font-weight: bold;
`

export const ChatMessages = styled.div`x;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
`
