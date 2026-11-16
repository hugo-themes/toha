import Alpine from 'alpinejs'
import docsShell from './shell.js'
import docsSearch from './search.js'

Alpine.data('docsShell', docsShell)
Alpine.data('modernShell', docsShell)
Alpine.data('docsSearch', docsSearch)
Alpine.data('searchDialog', docsSearch)
Alpine.start()
