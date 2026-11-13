import Fuse from 'fuse.js'
import Mark from 'mark.js'

window.addEventListener('DOMContentLoaded', () => {
  const summaryInclude = 60

  const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.1,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.8 },
      { name: 'hero', weight: 0.7 },
      { name: 'summary', weight: 0.6 },
      { name: 'date', weight: 0.5 },
      { name: 'contents', weight: 0.5 },
      { name: 'tags', weight: 0.3 },
      { name: 'categories', weight: 0.3 }
    ]
  }

  const searchQuery = param('keyword')
  if (searchQuery) {
    document.getElementById('search-box').value = searchQuery
    executeSearch(searchQuery)
  } else {
    const node = document.createElement('p')
    node.textContent = 'Please enter a word or phrase above'
    document.getElementById('search-results')?.append(node)
  }

  function executeSearch (searchQuery) {
    const url = window.location.href.split('/search/')[0] + '/index.json'

    fetch(url).then(response => response.json()).then(function (data) {
      const pages = data
      const fuse = new Fuse(pages, fuseOptions)
      const results = fuse.search(searchQuery)

      document.getElementById('search-box').value = searchQuery
      if (results.length > 0) {
        populateResults(results)
      } else {
        const node = document.createElement('p')
        node.textContent = 'No matches found'
        document.getElementById('search-results')?.append(node)
      }
    })
  }

  function populateResults (results) {
    results.forEach(function (value, key) {
      const contents = value.item.contents
      let snippet = ''
      const snippetHighlights = []
      if (fuseOptions.tokenize) {
        snippetHighlights.push(searchQuery)
      } else {
        value.matches.forEach(function (mvalue) {
          if (mvalue.key === 'tags' || mvalue.key === 'categories') {
            snippetHighlights.push(mvalue.value)
          } else if (mvalue.key === 'contents') {
            const start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0
            const end = mvalue.indices[0][1] + summaryInclude < contents.length ? mvalue.indices[0][1] + summaryInclude : contents.length
            snippet += contents.substring(start, end)
            snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1))
          }
        })
      }

      if (snippet.length < 1) {
        snippet += contents.substring(0, summaryInclude * 2)
      }
      // pull template from hugo template definition
      const templateDefinition = document.getElementById('search-result-template').innerHTML
      // replace values
      function adaptTags() {
        const tags = value.item.tags;
        let string = '';
        if (tags) tags.forEach((t) => {string += '<li class="rounded"><a href="/tags/' + t.toLowerCase() + '/" class="btn btn-sm btn-info">' + t + "</a></li>"});
        return string;
      }

      const output = render(templateDefinition, {
        key,
        title: value.item.title,
        hero: value.item.hero,
        date: value.item.date,
        summary: value.item.summary,
        link: value.item.permalink,
        tags: adaptTags(),
        categories: value.item.categories,
        snippet
      })

      const dom = new DOMParser().parseFromString(output, 'text/html')
      const image = dom.querySelector('.card-img-top')
      if (image) image.alt = value.item.title
      document.getElementById('search-results').append(dom.getElementsByClassName('post-card')[0])

      snippetHighlights.forEach(function (snipvalue) {
        const context = document.getElementById('#summary-' + key)
        const instance = new Mark(context)
        instance.mark(snipvalue)
      })
    })
  }

  function param (name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ')
  }

  function render (templateString, data) {
    let conditionalMatches, copy
    const conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g
    // since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
    copy = templateString
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
      if (data[conditionalMatches[1]]) {
        // valid key, remove conditionals, leave contents.
        copy = copy.replace(conditionalMatches[0], conditionalMatches[2])
      } else {
        // not valid, remove entire section
        copy = copy.replace(conditionalMatches[0], '')
      }
    }
    templateString = copy
    // now any conditionals removed we can do simple substitution
    let key, find, re
    for (key in data) {
      find = '\\$\\{\\s*' + key + '\\s*\\}'
      re = new RegExp(find, 'g')
      templateString = templateString.replace(re, data[key])
    }
    return templateString
  }
})
