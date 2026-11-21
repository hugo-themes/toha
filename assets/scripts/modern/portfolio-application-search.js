import Alpine from 'alpinejs'
import docsShell from './shell.js'
import docsSearch from './search.js'
import './navbar.js'
import { initializeModernPortfolio } from './portfolio.js'

Alpine.data('modernShell', docsShell)
Alpine.data('searchDialog', docsSearch)
Alpine.start()
initializeModernPortfolio()
