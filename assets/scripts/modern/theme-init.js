// Run before CSS loads to avoid a flash; blocked storage still allows system mode.
try {
  const preference = window.localStorage.getItem('toha-modern-theme')
  document.documentElement.classList.toggle('dark', preference === 'dark' ||
    (preference !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches))
} catch {
  document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
}
