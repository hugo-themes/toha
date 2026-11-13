const updateNavBar = () => {
  const topNavbar = document.getElementById('top-navbar')
  const navbarToggler = document.getElementById('navbar-toggler')
  const themeIcon = document.getElementById('navbar-theme-icon-svg')

  if (window.scrollY > 40) {
    topNavbar?.classList.remove('transparent-navbar')
    topNavbar?.classList.add('shadow')

    navbarToggler?.classList.remove('navbar-dark')
    navbarToggler?.classList.add('navbar-light')

    // color theme selector a.k.a. dark mode
    themeIcon?.classList.remove('svg-inverted')

    // get the main logo from hidden img tag
    const mainLogo = document.getElementById('main-logo')
    if (mainLogo) {
      const logoURL = mainLogo.getAttribute('src')
      document.getElementById('logo')?.setAttribute('src', logoURL)
    }
  } else {
    topNavbar?.classList.remove('shadow')
    topNavbar?.classList.add('transparent-navbar')

    navbarToggler?.classList.remove('navbar-light')
    navbarToggler?.classList.add('navbar-dark')

    // color theme selector a.k.a. dark mode
    themeIcon?.classList.add('svg-inverted')

    // get the inverted logo from hidden img tag
    const invertedLogo = document.getElementById('inverted-logo')
    if (invertedLogo) {
      const logoURL = invertedLogo.getAttribute('src')
      document.getElementById('logo')?.setAttribute('src', logoURL)
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // change navbar style on scroll
  // ==================================================
  // When the user scrolls down 80px from the top of the document,
  // resize the navbar's padding and the logo's font size
  const topNavbar = document.getElementById('top-navbar')
  if (topNavbar?.classList.contains('homepage')) {
    document.addEventListener('scroll', updateNavBar)
    updateNavBar()
  }

  // Creates a click handler to collapse the navigation when
  // anchors in the mobile nav pop up are clicked
  const navMain = document.getElementsByClassName('navbar-collapse')
  Array.from(navMain).forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && !e.target.classList.contains("dropdown-toggle")) {
        el.classList.add('collapse')
        el.classList.remove('show')
      }
    })
  })
})
