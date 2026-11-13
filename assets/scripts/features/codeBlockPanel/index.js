import * as params from '@params'
import { initializeCodeBlocks } from './panel'

export const ready = new Promise((resolve) => {
  function initialize() {
    const revealFragment = initializeCodeBlocks(document, navigator.clipboard, params.codeblock)
    revealFragment(window.location.hash)
    window.addEventListener('hashchange', () => revealFragment(window.location.hash))
    resolve()
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true })
  } else {
    initialize()
  }
})
