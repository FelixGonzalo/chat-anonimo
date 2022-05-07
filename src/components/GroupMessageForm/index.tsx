import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { RootState, actionCreators } from '../../state'
import {
  Button,
  FormContainer,
  FormFooter,
  InputMessage,
} from '../MessageForm/styles'
import { MessageType } from '../../types/message'
import { ChatType } from '../../types/chat'
import { localStorage_getArray } from '../../utils/localStorage_getArray'

export function GroupMessageForm() {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState<string>('')
  const currentUser = useSelector((state: RootState) => state.currentUser)
  const activeGroupChat = useSelector(
    (state: RootState) => state.activeGroupChat
  )

  const handleInputMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setInputMessage(e.target.value)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    updateActiveGroupChat()
    if (inputMessage === '') return

    const from = {
      id: currentUser.id,
      nick: currentUser.nick,
    }
    const date = Date.now()
    const newId = nanoid()

    dispatch(
      actionCreators.addMessageToActiveGroupChat(
        newId,
        from,
        inputMessage,
        date
      )
    )
    saveMsgInGroupChatsOfLocalStorage(activeGroupChat.id, {
      id: newId,
      from,
      message: inputMessage,
      date,
    })

    setInputMessage('')
  }

  const updateActiveGroupChat = () => {
    const privateChatsLocal: Array<ChatType> =
      localStorage_getArray('groupChats')
    const chatLocal = privateChatsLocal.find(
      (chat) => chat.id === activeGroupChat.id
    )

    if (chatLocal) {
      dispatch(
        actionCreators.setActiveGroupChat({
          ...activeGroupChat,
          messages: chatLocal.messages,
        })
      )
    }
  }

  const saveMsgInGroupChatsOfLocalStorage = (
    chatId: string,
    message: MessageType
  ) => {
    try {
      const chatsLocal: string | null = localStorage.getItem('groupChats')
      if (chatsLocal) {
        const chatsParse = JSON.parse(chatsLocal)
        const chatUpdate = chatsParse.map((chat: ChatType) => {
          if (chat.id === chatId) {
            return { ...chat, messages: [...chat.messages, message] }
          }
          return chat
        })
        localStorage.setItem('groupChats', JSON.stringify(chatUpdate))
      }
    } catch (error) {
      console.error('saveMsgInGroupChatsOfLocalStorage', error)
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
        <Button onClick={updateActiveGroupChat}>Actualizar chat</Button>
      </FormFooter>
    </>
  )
}
