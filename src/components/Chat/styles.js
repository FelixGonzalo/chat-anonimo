import styled from 'styled-components'

export const ChatContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  max-height: 100vh;
  padding: 10px;
  background: #336b6b;
  border-radius: 3px;
`

export const ChatHeader = styled.div`
  padding-bottom: 10px;
  color: #e4f2e7;
  font-weight: bold;
`

export const ChatMessagesContainer = styled.div`
  padding-right: 5px;
  padding-bottom: 20px;
  min-height: 80vh;
  max-height: 80vh;
  overflow: auto;
`

export const ChatMessages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
`
