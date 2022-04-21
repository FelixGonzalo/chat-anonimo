import styled from 'styled-components'

export const ChatContainer = styled.div`
  position: sticky;
  top: 1vh;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  min-height: 98vh;
  max-height: 98vh;
  padding: 10px;
  background: #336b6b;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`

export const ChatHeader = styled.div`
  padding-bottom: 10px;
  color: #e4f2e7;
  font-weight: bold;
`

export const ChatMessagesContainer = styled.div`
  padding-right: 5px;
  margin-bottom: 20px;
  flex-grow: 1;
  overflow: auto;
`

export const ChatMessages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
`
