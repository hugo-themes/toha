import mermaid from 'mermaid'
import * as params from '@params'

const mermaidOptions = params.flowchart?.mermaid || {}

// Get theme configuration
const lightTheme = mermaidOptions.theme || 'default'
const darkTheme = mermaidOptions.darkTheme || 'dark'

// Function to get current site theme
function getCurrentTheme() {
  const htmlElement = document.documentElement
  return htmlElement.getAttribute('data-theme') || 'light'
}

// Function to get appropriate mermaid theme based on site theme
function getMermaidTheme() {
  const currentTheme = getCurrentTheme()
  return currentTheme === 'dark' ? darkTheme : lightTheme
}

// Function to initialize mermaid with current theme
function initializeMermaid() {
  const theme = getMermaidTheme()
  const options = Object.assign({}, mermaidOptions, {
    startOnLoad: false,
    theme
  })
  mermaid.initialize(options)
  
  // Run mermaid on all diagrams
  mermaid.run()
}

// Initialize mermaid when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMermaid)
} else {
  initializeMermaid()
}

// Listen for theme changes and reinitialize mermaid
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      // Clear existing mermaid diagrams
      const mermaidDivs = document.querySelectorAll('.mermaid')
      mermaidDivs.forEach((div) => {
        // Store the original content if not already stored
        if (!div.hasAttribute('data-original-content')) {
          div.setAttribute('data-original-content', div.textContent)
        }
        // Restore original content
        const originalContent = div.getAttribute('data-original-content')
        div.textContent = originalContent
        div.removeAttribute('data-processed')
      })
      
      // Reinitialize with new theme
      initializeMermaid()
    }
  })
})

// Start observing the document element for attribute changes
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
})
