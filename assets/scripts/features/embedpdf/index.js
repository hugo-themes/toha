import { insertScript } from '../../core'

const PDFJS_BUNDLE = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/build/pdf.min.js'
const WORKER_BUNDLE = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/build/pdf.worker.min.js'

class PDFViewer {
  constructor(el) {
    const {
      url,
      hidePaginator,
      hideLoader,
      scale,
      pageNum
    } = el.dataset

    if (url == null) {
      throw new Error('Cannot load PDF! Attribute `data-url` is not set.')
    }

    // props
    this.url = url
    this.hidePaginator = hidePaginator !== 'false'
    this.hideLoader = hideLoader !== 'false'
    this.scale = scale || 3

    // initial state
    this.pageNum = parseInt(pageNum, 10) || 1
    this.loaded = false
    this.pageRendering = false
    this.pageNumPending = null

    // DOM elements
    this.canvas = el.getElementsByClassName('pdf-canvas')[0]
    if (this.canvas == null) {
      throw new Error('canvas element not found!')
    };
    this.paginator = el.getElementsByClassName('paginator')[0]
    this.loadingWrapper = el.getElementsByClassName('loading-wrapper')[0]
    this.next = el.getElementsByClassName('next')[0]
    this.prev = el.getElementsByClassName('prev')[0]
    this.curPage = el.getElementsByClassName('page-num')[0]
    this.pageCount = el.getElementsByClassName('page-count')[0]

    // context
    this.ctx = this.canvas.getContext('2d')

    // events
    this.next.addEventListener('click', this.handleNextPage.bind(this))
    this.prev.addEventListener('click', this.handlePrevPage.bind(this))
    this.downloadBtn = el.getElementsByClassName('download-pdf-btn')[0]
    if (this.downloadBtn) {
      this.downloadBtn.addEventListener('click', this.handleDownload.bind(this))
    }

    this.showPaginator()
    this.showLoader()
    this.loadPDF()
  }

  /**
   * If we haven't disabled the loader, show loader and hide canvas
   */
  showLoader() {
    if (this.hideLoader) return
    this.loadingWrapper.style.display = 'flex'
    this.canvas.style.display = 'none'
  }

  /**
   * If we haven't disabled the paginator, show paginator
   */
  showPaginator() {
    if (this.hidePaginator) return
    this.paginator.style.display = 'block'
  }

  /**
   * Hides loader and shows canvas
   */
  showContent() {
    this.loadingWrapper.style.display = 'none'
    this.canvas.style.display = 'block'
  }

  /**
   * Asynchronously downloads PDF.
   */
  async loadPDF() {
    this.pdfDoc = await window.pdfjsLib.getDocument(this.url).promise

    this.pageCount.textContent = this.pdfDoc.numPages

    // If the user passed in a number that is out of range, render the last page.
    if (this.pageNum > this.pdfDoc.numPages) {
      this.pageNum = this.pdfDoc.numPages
    }

    this.renderPage(this.pageNum)
  }

  /**
   * Get page info from document, resize canvas accordingly, and render page.
   * @param num Page number.
   */
  async renderPage(num) {
    this.pageRendering = true

    const page = await this.pdfDoc.getPage(num)
    const viewport = page.getViewport({ scale: this.scale })
    this.canvas.height = viewport.height
    this.canvas.width = viewport.width

    // Wait for rendering to finish
    await page.render({
      canvasContext: this.ctx,
      viewport
    }).promise

    this.pageRendering = false
    this.showContent()

    if (this.pageNumPending !== null) {
      // New page rendering is pending
      this.renderPage(this.pageNumPending)
      this.pageNumPending = null
    }
    // Update page counters
    this.curPage.textContent = num
  }

  /**
   * If another page rendering in progress, waits until the rendering is
   * finished. Otherwise, executes rendering immediately.
   */
  queueRenderPage(num) {
    if (this.pageRendering) {
      this.pageNumPending = num
    } else {
      this.renderPage(num)
    }
  }

  /**
   * Displays previous page.
   */
  handlePrevPage() {
    if (this.pageNum <= 1) {
      return
    }
    this.pageNum--
    this.queueRenderPage(this.pageNum)
  }

  /**
   * Displays next page.
   */
  handleNextPage() {
    if (this.pageNum >= this.pdfDoc.numPages) {
      return
    }
    this.pageNum++
    this.queueRenderPage(this.pageNum)
  }

  handleDownload(e) {
    console.log('Downloading PDF:', this.url)
  }
}

insertScript('pdfjs', PDFJS_BUNDLE, () => {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_BUNDLE
  Array.from(document.getElementsByClassName('pdf-viewer')).forEach(el => new PDFViewer(el))
})
