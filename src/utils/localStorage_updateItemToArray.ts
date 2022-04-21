export const localStorage_updateItemToArray = (
  item: any,
  arrayName: string
) => {
  try {
    const arrayLocalStorage = localStorage.getItem(arrayName) || null

    if (!arrayLocalStorage) {
      return localStorage.setItem(arrayName, JSON.stringify([item]))
    }

    const currentData = JSON.parse(arrayLocalStorage)
    if (!Array.isArray(currentData)) {
      return localStorage.setItem(arrayName, JSON.stringify([item]))
    }

    const arrayUpdate = currentData.map((data: any) => {
      if (data.id === item.id) {
        return item
      }
      return data
    })

    localStorage.setItem(arrayName, JSON.stringify(arrayUpdate))
  } catch (error) {
    console.error(error)
  }
}
