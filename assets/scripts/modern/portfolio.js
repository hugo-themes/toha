// Progressive enhancement for modern portfolio navigation, filters, dialogs, and gallery slider.
function splitCategories (value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

function isOutsideRect (dialog, event) {
  const rect = dialog.getBoundingClientRect()
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
}

function bindDialogDismiss (dialog, onClosed) {
  let backdropPress = false
  dialog.addEventListener('pointerdown', (event) => {
    backdropPress = event.target === dialog && isOutsideRect(dialog, event)
  })
  dialog.addEventListener('click', (event) => {
    if (backdropPress && event.target === dialog && isOutsideRect(dialog, event)) {
      dialog.close()
    }
    backdropPress = false
  })
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault()
    dialog.close()
  })
  dialog.addEventListener('close', onClosed)
}

function initializeDisclosures (document, window) {
  const disclosures = [...document.querySelectorAll('[data-portfolio-disclosure]')]
  if (disclosures.length === 0) return

  const closeAll = () => {
    for (const item of disclosures) item.open = false
  }

  document.addEventListener('click', (event) => {
    for (const item of disclosures) {
      if (item.open && !item.contains(event.target)) item.open = false
    }
    if (event.target?.closest?.('a')) closeAll()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    for (const item of disclosures) {
      if (!item.open) continue
      const summary = item.querySelector('summary')
      const focusInside = item.contains(document.activeElement)
      item.open = false
      if (focusInside) summary?.focus({ preventScroll: true })
    }
  })

  if (typeof window?.matchMedia === 'function') {
    window.matchMedia('(min-width: 64rem)').addEventListener('change', (mq) => {
      if (mq.matches) closeAll()
    })
  }
}

function initializeFilters (document) {
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const key = group.dataset.filterGroup
    const grid = document.querySelector(`[data-filter-grid="${key}"]`)
    if (!grid) return
    const statusEl = document.getElementById(`${key}-status`)
    const cards = [...grid.children]
    const pills = [...group.querySelectorAll('[data-filter]')]
    const template = group.dataset.statusTemplate || ''

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const chosen = (pill.dataset.filter || 'all').toLowerCase()
        pills.forEach((p) => p.setAttribute('aria-pressed', String(p === pill)))
        let visible = 0
        cards.forEach((card) => {
          const cats = splitCategories(card.dataset.cats)
          const show = chosen === 'all' || cats.includes(chosen)
          card.hidden = !show
          if (show) visible++
        })
        if (statusEl && template) {
          statusEl.textContent = template
            .replace('__COUNT__', String(visible))
            .replace('__FILTER__', pill.textContent.trim())
        }
      })
    })
  })
}

function initializeScrollSpy (document, window) {
  const sections = [...document.querySelectorAll('section[data-section-name]')]
  const spyLinks = [...document.querySelectorAll('[data-spy]')]
  const mobileLabel = document.getElementById('mobile-active-label')
  if (sections.length === 0 || spyLinks.length === 0 || typeof window?.IntersectionObserver !== 'function') return

  const setActive = (id) => {
    const match = sections.find((section) => section.id === id)
    if (!match) return
    spyLinks.forEach((link) => {
      if (link.dataset.spy === id) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
    if (mobileLabel) mobileLabel.textContent = match.dataset.sectionName || ''
  }

  const observer = new window.IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length > 0) setActive(visible[0].target.id)
    },
    { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
  )
  sections.forEach((section) => observer.observe(section))
}

function initializeDetailDialog (document, window) {
  const dialog = document.getElementById('portfolio-detail-dialog')
  const content = document.getElementById('portfolio-detail-content')
  if (!dialog || !content || typeof dialog.showModal !== 'function') return

  let trigger = null
  const openModal = (source) => {
    trigger = source
    document.documentElement.classList.add('portfolio-modal-open')
    dialog.showModal()
  }

  bindDialogDismiss(dialog, () => {
    document.documentElement.classList.remove('portfolio-modal-open')
    if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    trigger = null
  })

  document.querySelectorAll('[data-dialog-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tpl = document.getElementById(btn.dataset.dialogOpen)
      if (!tpl) return
      dialog.dataset.variant = btn.dataset.dialogVariant || 'wide'
      content.replaceChildren(tpl.content.cloneNode(true))
      const title = content.querySelector('[data-dialog-title]')
      if (title) title.id = 'portfolio-dialog-title'
      const closeBtn = content.querySelector('[data-dialog-close]')
      if (closeBtn) closeBtn.addEventListener('click', () => dialog.close())
      content.querySelectorAll('[data-dialog-jump]').forEach((link) => {
        link.addEventListener('click', () => dialog.close())
      })
      openModal(btn)
      if (closeBtn && typeof window !== 'undefined') closeBtn.focus({ preventScroll: true })
    })
  })
}

function initializeLightbox (document) {
  const lightbox = document.getElementById('portfolio-lightbox-dialog')
  const img = document.getElementById('portfolio-lightbox-img')
  const title = document.getElementById('portfolio-lightbox-title')
  const caption = document.getElementById('portfolio-lightbox-caption')
  const nav = document.getElementById('portfolio-lightbox-nav')
  const counter = document.getElementById('portfolio-lightbox-counter')
  const prevBtn = document.getElementById('portfolio-lightbox-prev')
  const nextBtn = document.getElementById('portfolio-lightbox-next')
  const closeBtn = document.getElementById('portfolio-lightbox-close')
  if (!lightbox || !img || !title || !caption || typeof lightbox.showModal !== 'function') return

  let activeGallery = []
  let activeIndex = 0
  let trigger = null

  const renderItem = (btn) => {
    img.src = btn.dataset.lightboxSrc || ''
    img.alt = btn.dataset.lightboxTitle || ''
    title.textContent = btn.dataset.lightboxTitle || ''
    caption.textContent = btn.dataset.lightboxCaption || ''
    if (nav && counter) {
      if (activeGallery.length > 1) {
        nav.hidden = false
        counter.textContent = `${activeIndex + 1} / ${activeGallery.length}`
      } else {
        nav.hidden = true
      }
    }
  }

  const step = (delta) => {
    if (activeGallery.length < 2) return
    activeIndex = (activeIndex + delta + activeGallery.length) % activeGallery.length
    renderItem(activeGallery[activeIndex])
  }

  bindDialogDismiss(lightbox, () => {
    document.documentElement.classList.remove('portfolio-modal-open')
    if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    trigger = null
  })

  document.querySelectorAll('[data-lightbox-src]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.lightboxGallery
      activeGallery = group
        ? [...document.querySelectorAll(`[data-lightbox-gallery="${group}"]`)]
        : []
      activeIndex = Math.max(0, activeGallery.indexOf(btn))
      trigger = btn
      renderItem(btn)
      document.documentElement.classList.add('portfolio-modal-open')
      lightbox.showModal()
    })
  })

  prevBtn?.addEventListener('click', () => step(-1))
  nextBtn?.addEventListener('click', () => step(1))
  closeBtn?.addEventListener('click', () => lightbox.close())
  lightbox.addEventListener('keydown', (event) => {
    if (!lightbox.open || activeGallery.length < 2) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
  })
}

function initializeAchievementsSlider (document, window) {
  const showcase = document.querySelector('[data-ach-showcase]')
  const track = document.querySelector('[data-ach-track]')
  const prevBtn = document.querySelector('[data-ach-prev]')
  const nextBtn = document.querySelector('[data-ach-next]')
  const dots = [...document.querySelectorAll('[data-ach-index]')]
  if (!showcase || !track || dots.length === 0) return

  const slides = [...track.children]
  if (slides.length < 2) {
    if (prevBtn) prevBtn.hidden = true
    if (nextBtn) nextBtn.hidden = true
    return
  }

  let current = 0
  let timer = 0
  let paused = false
  const reduceMotion = Boolean(
    window?.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const syncUI = (index) => {
    current = index
    dots.forEach((btn, i) => btn.setAttribute('aria-pressed', String(i === index)))
  }

  const goTo = (index, restartAuto) => {
    const next = (index + slides.length) % slides.length
    if (typeof track.scrollTo === 'function') {
      track.scrollTo({ left: slides[next].offsetLeft || 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
    syncUI(next)
    if (restartAuto) scheduleAuto()
  }

  const scheduleAuto = () => {
    if (timer) {
      window.clearInterval(timer)
      timer = 0
    }
    if (reduceMotion || typeof window?.setInterval !== 'function') return
    timer = window.setInterval(() => {
      if (paused || document.hidden || document.documentElement.classList.contains('portfolio-modal-open')) return
      goTo(current + 1, false)
    }, 4500)
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1, true))
  nextBtn?.addEventListener('click', () => goTo(current + 1, true))
  dots.forEach((btn) => {
    btn.addEventListener('click', () => goTo(Number(btn.dataset.achIndex) || 0, true))
  })

  let raf = 0
  track.addEventListener(
    'scroll',
    () => {
      if (raf || typeof window?.requestAnimationFrame !== 'function') return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const width = track.clientWidth || 1
        const index = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / width)))
        if (index !== current) syncUI(index)
      })
    },
    { passive: true }
  )

  showcase.addEventListener('pointerenter', () => {
    paused = true
  })
  showcase.addEventListener('pointerleave', () => {
    paused = false
  })
  showcase.addEventListener('focusin', () => {
    paused = true
  })
  showcase.addEventListener('focusout', (event) => {
    if (!showcase.contains(event.relatedTarget)) paused = false
  })
  showcase.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(current - 1, true)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(current + 1, true)
    }
  })

  scheduleAuto()
}

function initializeSearchHashClose (document, window) {
  const dialog = document.getElementById('portfolio-search-dialog')
  if (!dialog) return
  dialog.addEventListener('click', (event) => {
    const link = event.target?.closest?.('[data-search-result]')
    if (!link) return
    try {
      const target = new URL(link.href, window?.location?.href || 'https://example.invalid/')
      if (target.hash && (!window?.location || target.pathname === window.location.pathname)) {
        if (dialog.open) dialog.close()
      }
    } catch {}
  })
}

export function initializeModernPortfolio (document = globalThis.document) {
  if (!document) return
  const window = document.defaultView
  initializeDisclosures(document, window)
  initializeFilters(document)
  initializeScrollSpy(document, window)
  initializeDetailDialog(document, window)
  initializeLightbox(document)
  initializeAchievementsSlider(document, window)
  initializeSearchHashClose(document, window)
}
