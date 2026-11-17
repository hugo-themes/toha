import Alpine from 'alpinejs'
import docsShell from './shell.js'
import docsToc from './toc.js'

Alpine.data('docsShell', docsShell)
Alpine.data('modernShell', docsShell)
Alpine.data('docsToc', docsToc)
Alpine.start()
