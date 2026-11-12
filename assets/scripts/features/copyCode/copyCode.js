addCopyButtons(navigator.clipboard)

function addCopyButtons(clipboard) {
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    // The panel owns its Copy action and preserves the original fenced source.
    if (codeBlock.closest('[data-code-block]')) return
    const button = document.createElement('button')
    button.title = "Copy"
    button.className = 'copy-code-button btn btn-sm'
    button.innerHTML = "<i class='fa-regular fa-copy'></i>"

    button.addEventListener('click', function () {
      clipboard.writeText(codeBlock.innerText)
    })

    const pre = codeBlock.parentNode
    if (pre.parentNode.classList.contains('highlight')) {
      const highlight = pre.parentNode
      highlight.parentNode.insertBefore(button, highlight)
    } else {
      pre.parentNode.insertBefore(button, pre)
    }
  })
}
