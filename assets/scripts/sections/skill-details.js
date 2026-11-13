// Keep the server-rendered sections and links usable when native dialogs are unavailable.
export function initializeSkillDetails (document) {
  if (typeof document.createElement('dialog').showModal !== 'function') return

  document.querySelectorAll('[data-skill-details]').forEach((content) => {
    const links = [...document.querySelectorAll('[data-skill-details-target]')]
      .filter((link) => link.dataset.skillDetailsTarget === content.id)
    if (links.length === 0) return

    const dialog = document.createElement('dialog')
    dialog.id = `${content.id}-dialog`
    dialog.className = 'skill-details-dialog'
    dialog.setAttribute('aria-labelledby', content.getAttribute('aria-labelledby'))
    content.before(dialog)
    dialog.appendChild(content)

    const closeButton = content.querySelector('.skill-details-close')
    closeButton.hidden = false
    closeButton.addEventListener('click', () => dialog.close())
    let opener
    let backdropPress = false
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect()
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
    }
    dialog.addEventListener('pointerdown', (event) => { backdropPress = event.target === dialog && outside(event) })
    dialog.addEventListener('click', (event) => {
      if (backdropPress && event.target === dialog && outside(event)) dialog.close()
      backdropPress = false
    })
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('skill-details-open')
      opener?.focus({ preventScroll: true })
    })

    links.forEach((link) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = link.className
      button.setAttribute('aria-haspopup', 'dialog')
      button.setAttribute('aria-controls', dialog.id)
      button.append(...link.childNodes)
      button.addEventListener('click', () => {
        opener = button
        dialog.showModal()
        dialog.scrollTop = 0
        document.documentElement.classList.add('skill-details-open')
        closeButton.focus({ preventScroll: true })
      })
      link.replaceWith(button)
    })
  })
}
