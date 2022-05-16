import { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { GroupChatType } from '../types/chat'
import { UserType } from '../types/user'
import { localStorage_getArray } from '../utils/localStorage_getArray'

export function useSearchChats(value: string) {
  const dispatch = useDispatch()
  const [filterUsers, setFilterUsers] = useState<Array<UserType>>([])
  const [filterGroupChats, setFilterGroupChats] = useState<
    Array<GroupChatType>
  >([])

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault()

    updateArrayStateWithlocalDB('users', actionCreators.initUserState)
    updateArrayStateWithlocalDB(
      'groupChats',
      actionCreators.initGroupChatsState
    )
    const users = localStorage_getArray('users')
    const groupChats = localStorage_getArray('groupChats')

    if (value.trim() === '') return setFilterUsers([])

    // search users
    const maxResult = 3
    let results = 0
    const searchResult: Array<UserType> = []
    users.forEach((user: UserType) => {
      if (results > maxResult - 1) return
      if (
        user.nick.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        searchResult.push({ ...user })
        results++
      }
    })
    setFilterUsers(searchResult)

    // search group chats
    results = 0
    const searchResult2: Array<GroupChatType> = []
    groupChats.forEach((chat: GroupChatType) => {
      if (results > maxResult - 1) return
      if (
        chat.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
      ) {
        searchResult2.push({ ...chat })
        results++
      }
    })
    setFilterGroupChats(searchResult2)
  }

  const updateArrayStateWithlocalDB = (
    itemLocalStorage: string,
    action: any // eslint-disable-line
  ) => {
    try {
      const data: any = localStorage.getItem(itemLocalStorage) // eslint-disable-line
      const currentData = JSON.parse(data)
      dispatch(action(currentData))
    } catch (error) {
      console.error(error)
    }
  }

  return { handleSearch, filterUsers, filterGroupChats }
}
