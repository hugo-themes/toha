import TypeIt from 'typeit'

// =========== Typing Carousel ================
// get data from hidden ul and set as typing data
document.addEventListener('DOMContentLoaded', () => {
  const $ul = document.getElementById('typing-carousel-data')?.children
  if ($ul == null || $ul.length === 0) return

  const strings = Array.from($ul).map($el => $el.textContent)

  let typeItInstance = new TypeIt('#typed', {
    speed: 100,
    deleteSpeed: 100,
    lifeLike: false,
    breakLines: false,
    cursorChar: "|",
    waitUntilVisible: true,
    html: false,
    loop: true
  })

  // Add all strings to the chain
  strings.forEach((string, index) => {
    typeItInstance = typeItInstance.type(string)
    if (index < strings.length - 1) {
      typeItInstance = typeItInstance.delete(string.length)
    }
  })

  typeItInstance.go()
})
