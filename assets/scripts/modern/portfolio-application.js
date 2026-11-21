import Alpine from 'alpinejs'
import docsShell from './shell.js'
import './navbar.js'
import { initializeModernPortfolio } from './portfolio.js'

Alpine.data('modernShell', docsShell)
Alpine.start()
initializeModernPortfolio()
