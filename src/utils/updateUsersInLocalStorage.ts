import { UserType } from '../types/user'

export const updateUsersInLocalStorage = (
  userId: string,
  groupChatId: string
) => {
  try {
    const usersLocalStorage: string | null = localStorage.getItem('users')
    if (usersLocalStorage) {
      const usersParse = JSON.parse(usersLocalStorage)
      const usersUpdate = usersParse.map((user: UserType) => {
        if (user.id === userId) {
          if (!user.groupsChatsId)
            return { ...user, groupsChatsId: [groupChatId] }
          if (!user.groupsChatsId.includes(groupChatId))
            return {
              ...user,
              groupsChatsId: [...user.groupsChatsId, groupChatId],
            }
        }
        return user
      })
      localStorage.setItem('users', JSON.stringify(usersUpdate))
    }
  } catch (error) {
    console.error('updateUsersInLocalStorage', error)
  }
}
