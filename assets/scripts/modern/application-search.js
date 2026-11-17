import Alpine from 'alpinejs'
import docsShell from './shell.js'
import docsSearch from './search.js'
import docsToc from './toc.js'
import './navbar.js'

Alpine.data('docsShell', docsShell)
Alpine.data('modernShell', docsShell)
Alpine.data('docsSearch', docsSearch)
Alpine.data('searchDialog', docsSearch)
Alpine.data('docsToc', docsToc)
Alpine.start()
