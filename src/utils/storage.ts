export const storage = {
  get(key: string) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }

    return null
  },

  set(key: string, value: string) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem(key, value)
    }
  }
}
