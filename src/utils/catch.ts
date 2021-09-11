class LocalCache {
  setCatch(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return ''
    }
  }

  deleteCatch(key: string) {
    localStorage.removeItem(key)
  }
  clearCatch() {
    //清空
    localStorage.clear()
  }
}
export default new LocalCache()
