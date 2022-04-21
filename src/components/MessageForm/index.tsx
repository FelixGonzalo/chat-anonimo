import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer, InputMessage, Button } from './styles'
import { addMessageToActiveChat } from '../../reducers/activeChatReducer'
import { addMessageToPrivateChat } from '../../reducers/privateChatsReducer'
import { PrivateChatType } from '../../types/privateChat'
import { MessageType } from '../../types/message'

export function MessageForm() {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState<string>('')
  const currentUser = useSelector((state: any) => state.currentUser)
  const activeChat = useSelector((state: any) => state.activeChat)

  const handleInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const objective = activeChat.users.find(
      (user: any) => user.id !== currentUser.id
    )

    const to = {
      id: objective.id,
      nick: objective.nick,
    }
    const from = {
      id: currentUser.id,
      nick: currentUser.nick,
    }
    const date = Date.now()

    dispatch(addMessageToActiveChat(from, to, inputMessage, date))
    dispatch(
      addMessageToPrivateChat(activeChat.id, from, to, inputMessage, date)
    )
    saveMsgInPrivateChatsOfLocalStorage(activeChat.id, {
      from,
      to,
      message: inputMessage,
      date,
    })

    setInputMessage('')
  }

  const saveMsgInPrivateChatsOfLocalStorage = (
    chatId: string,
    message: MessageType
  ) => {
    try {
      const chatsLocal: string | null = localStorage.getItem('privateChats')
      if (chatsLocal) {
        const chatsParse = JSON.parse(chatsLocal)
        const chatUpdate = chatsParse.map((chat: PrivateChatType) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, message],
            }
          }
          return chat
        })
        localStorage.setItem('privateChats', JSON.stringify(chatUpdate))
      }
    } catch (error) {
      console.error('saveMsgInPrivateChatsOfLocalStorage', error)
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputMessage
        type='text'
        name='inputMessage'
        value={inputMessage}
        onChange={handleInputMessage}
      />
      <Button>Enviar</Button>
    </FormContainer>
  )
}
