export function localStorage_getArray(arrayName: string) {
  try {
    const data = localStorage.getItem(arrayName)
    if (!data) return []
    const dataParse = JSON.parse(data)
    if (!Array.isArray(dataParse)) return []
    return dataParse
  } catch (error) {
    console.error(error)
    return []
  }
}
