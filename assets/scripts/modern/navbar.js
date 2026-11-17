// Enhance native disclosures; navigation remains available without JavaScript.
const navbar = document.querySelector('[data-components-navbar]')
if (navbar) {
  const disclosures = [...navbar.querySelectorAll('[data-navbar-disclosure]')]
  const close = (item, restoreFocus = false) => {
    item.open = false
    if (restoreFocus) item.querySelector('summary')?.focus()
    for (const child of item.querySelectorAll('details[open]')) child.open = false
  }
  document.addEventListener('click', event => {
    for (const item of disclosures) {
      if (item.open && !item.contains(event.target)) close(item)
    }
    if (event.target.closest('a')) {
      for (const item of disclosures) if (item.open) close(item)
    }
  })
  navbar.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return
    const item = event.target.closest('details[open]')
    if (item) {
      event.preventDefault()
      event.stopPropagation()
      close(item, true)
    }
  })
  navbar.addEventListener('focusout', event => {
    if (event.relatedTarget && !navbar.contains(event.relatedTarget)) {
      for (const item of disclosures) if (item.open) close(item)
    }
  })
  window.matchMedia('(min-width: 64rem)').addEventListener('change', () => {
    for (const item of disclosures) if (item.open) close(item)
  })
}
