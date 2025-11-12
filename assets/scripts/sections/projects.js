import Filterizr from 'filterizr'
import { insertScript } from '../core'

document.addEventListener('DOMContentLoaded', () => {
  // ================== Project cards =====================

  // setup project filter buttons for all project sections
  const projectContainers = document.querySelectorAll('.filtr-projects')
  projectContainers.forEach((container) => {
    const sectionId = container.getAttribute('data-section')
    const cardHolder = document.getElementById(`project-card-holder-${sectionId}`)
    if (cardHolder != null && cardHolder.children.length !== 0) {
      // Create a unique selector for this section's controls
      const controlsSelector = `.project-filtr-control[data-section="${sectionId}"]`
      // eslint-disable-next-line no-new
      new Filterizr(container, {
        layout: 'sameWidth',
        controlsSelector
      })
    }
  })
})

// dynamically insert github buttons script.
insertScript('github-buttons', 'https://buttons.github.io/buttons.js')
