import Alpine from 'alpinejs'

Alpine.data('docsShell', () => ({
  dark: document.documentElement.classList.contains('dark'),
  init () {
    const wide = window.matchMedia('(min-width: 64rem)')
    const navigation = document.getElementById('docs-navigation')
    const resize = () => { navigation.open = wide.matches }
    resize()
    wide.addEventListener('change', resize)
    this.cleanup = () => wide.removeEventListener('change', resize)
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      let saved
      try { saved = window.localStorage.getItem('toha-modern-theme') } catch {}
      if (!saved) this.setTheme(scheme.matches)
    }
    scheme.addEventListener('change', sync)
    const cleanNavigation = this.cleanup
    this.cleanup = () => { cleanNavigation(); scheme.removeEventListener('change', sync) }
  },
  setTheme (dark) {
    this.dark = dark
    document.documentElement.classList.toggle('dark', dark)
  },
  toggleTheme () {
    this.setTheme(!this.dark)
    try { window.localStorage.setItem('toha-modern-theme', this.dark ? 'dark' : 'light') } catch {}
  },
  destroy () { this.cleanup?.() }
}))

Alpine.start()
