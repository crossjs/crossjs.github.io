export const mm = () => {
  if (typeof window !=='undefined') {
    return  window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
  }

  return 'dark';
}
