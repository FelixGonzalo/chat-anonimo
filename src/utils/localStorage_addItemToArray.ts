export const localStorage_addItemToArray = (item: any, arrayName: string) => {
  try {
    const arrayLocalStorage = localStorage.getItem(arrayName) || null

    if (!arrayLocalStorage) {
      return localStorage.setItem(arrayName, JSON.stringify([item]))
    }

    const currentData = JSON.parse(arrayLocalStorage)
    if (!Array.isArray(currentData)) {
      return localStorage.setItem(arrayName, JSON.stringify([item]))
    }

    localStorage.setItem(arrayName, JSON.stringify([...currentData, item]))
  } catch (error) {
    console.error(error)
  }
}
