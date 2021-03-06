import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, actionCreators } from '../../state'
import { ChatType } from '../../types/chat'
import { MessageType } from '../../types/message'
import { FormContainer, InputMessage, Button, FormFooter } from './styles'
import { nanoid } from 'nanoid'
import { localStorage_getArray } from '../../utils/localStorage_getArray'

export function MessageForm() {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState<string>('')
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const activeChat = useSelector((state: RootState) => state.activeChat)

  const handleInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    updateActiveChat()

    if (inputMessage === '') return

    const from = {
      id: currentUser.id,
      nick: currentUser.nick,
    }
    const date = Date.now()
    const newId = nanoid()

    dispatch(
      actionCreators.addMessageToActiveChat(newId, from, inputMessage, date)
    )
    saveMsgInPrivateChatsOfLocalStorage(activeChat.id, {
      id: newId,
      from,
      message: inputMessage,
      date,
    })

    setInputMessage('')
  }

  const updateActiveChat = () => {
    const privateChatsLocal: Array<ChatType> =
      localStorage_getArray('privateChats')
    const chatLocal = privateChatsLocal.find(
      (chat) => chat.id === activeChat.id
    )

    if (chatLocal) {
      dispatch(
        actionCreators.setActiveChat({
          id: activeChat.id,
          users: activeChat.users,
          messages: chatLocal.messages,
        })
      )
    }
  }

  const saveMsgInPrivateChatsOfLocalStorage = (
    chatId: string,
    message: MessageType
  ) => {
    try {
      const chatsLocal: string | null = localStorage.getItem('privateChats')
      if (chatsLocal) {
        const chatsParse = JSON.parse(chatsLocal)
        const chatUpdate = chatsParse.map((chat: ChatType) => {
          if (chat.id === chatId) {
            return { ...chat, messages: [...chat.messages, message] }
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
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputMessage
          type='text'
          name='inputMessage'
          value={inputMessage}
          onChange={handleInputMessage}
        />
        <Button>Enviar</Button>
      </FormContainer>
      <FormFooter>
        <Button onClick={updateActiveChat}>Actualizar chat</Button>
      </FormFooter>
    </>
  )
}
