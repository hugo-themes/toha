import { getDeviceState } from '../core'

function fourColumnRow (gallery, entries, i) {
  const entry1 = document.createElement('div')
  entry1.classList.add('col-lg-6', 'm-0', 'p-0')
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[0].classList.add('img-type-1')
  gallery.appendChild(entry1)
  i++

  const entry2 = document.createElement('div')
  entry2.classList.add('col-lg-3', 'm-0', 'p-0')
  entry2.appendChild(entries[i].cloneNode(true))
  entry2.children[0].classList.add('img-type-1')
  gallery.appendChild(entry2)
  i++

  const entry3 = document.createElement('div')
  entry3.classList.add('col-lg-3', 'm-0', 'p-0')
  entry3.appendChild(entries[i].cloneNode(true))
  entry3.children[0].classList.add('img-type-2')
  i++
  entry3.appendChild(entries[i].cloneNode(true))
  entry3.children[1].classList.add('img-type-2')
  gallery.appendChild(entry3)
  i++
}

function fourColumnReversedRow (gallery, entries, i) {
  const entry1 = document.createElement('div')
  entry1.classList.add('col-lg-3', 'm-0', 'p-0')
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[0].classList.add('img-type-2')
  i++
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[1].classList.add('img-type-2')
  gallery.appendChild(entry1)
  i++

  const entry2 = document.createElement('div')
  entry2.classList.add('col-lg-3', 'm-0', 'p-0')
  entry2.appendChild(entries[i].cloneNode(true))
  entry2.children[0].classList.add('img-type-1')
  gallery.appendChild(entry2)
  i++

  const entry3 = document.createElement('div')
  entry3.classList.add('col-lg-6', 'm-0', 'p-0')
  entry3.appendChild(entries[i].cloneNode(true))
  entry3.children[0].classList.add('img-type-1')
  gallery.appendChild(entry3)
  i++
}

function threeColumnRow (gallery, entries, i) {
  console.log(i)
  const entry1 = document.createElement('div')
  entry1.classList.add('col-lg-6', 'col-md-6', 'm-0', 'p-0')
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[0].classList.add('img-type-1')
  gallery.appendChild(entry1)
  i++

  const entry2 = document.createElement('div')
  entry2.classList.add('col-lg-3', 'col-md-3', 'm-0', 'p-0')
  entry2.appendChild(entries[i].cloneNode(true))
  entry2.children[0].classList.add('img-type-1')
  gallery.appendChild(entry2)
  i++

  const entry3 = document.createElement('div')
  entry3.classList.add('col-lg-3', 'col-md-3', 'm-0', 'p-0')
  entry3.appendChild(entries[i].cloneNode(true))
  entry3.children[0].classList.add('img-type-1')
  gallery.appendChild(entry3)
  i++
}

function threeColumnReversedRow (gallery, entries, i) {
  const entry1 = document.createElement('div')
  entry1.classList.add('col-lg-3', 'col-md-3', 'm-0', 'p-0')
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[0].classList.add('img-type-1')
  gallery.appendChild(entry1)
  i++

  const entry2 = document.createElement('div')
  entry2.classList.add('col-lg-3', 'col-md-3', 'm-0', 'p-0')
  entry2.appendChild(entries[i].cloneNode(true))
  entry2.children[0].classList.add('img-type-1')
  gallery.appendChild(entry2)
  i++

  const entry3 = document.createElement('div')
  entry3.classList.add('col-lg-6', 'col-md-3', 'm-0', 'p-0')
  entry3.appendChild(entries[i].cloneNode(true))
  entry3.children[0].classList.add('img-type-1')
  gallery.appendChild(entry3)
  i++
}

function twoColumnRow (gallery, entries, i) {
  const entry1 = document.createElement('div')
  entry1.classList.add('col-6', 'm-0', 'p-0')
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[0].classList.add('img-type-1')
  gallery.appendChild(entry1)
  i++

  const entry2 = document.createElement('div')
  entry2.classList.add('col-6', 'm-0', 'p-0')
  entry2.appendChild(entries[i].cloneNode(true))
  entry2.children[0].classList.add('img-type-1')
  gallery.appendChild(entry2)
  i++
}

function singleColumnRow (gallery, entries, i) {
  const entry1 = document.createElement('div')
  entry1.classList.add('col-12', 'm-0', 'p-0')
  entry1.appendChild(entries[i].cloneNode(true))
  entry1.children[0].classList.add('img-type-1')
  gallery.appendChild(entry1)
  i++
}

function showAchievements () {
  const { isLaptop, isTablet } = getDeviceState()
  
  // Process all achievements sections
  const galleries = document.querySelectorAll('.achievements-gallery')
  galleries.forEach((gallery) => {
    if (gallery == null) {
      return
    }
    gallery.innerHTML = ''
    
    // Find the corresponding achievements-holder for this gallery
    const galleryId = gallery.id
    const holderId = galleryId.replace('gallery-', 'achievements-holder-')
    const holder = document.getElementById(holderId)
    if (!holder) {
      return
    }
    
    const entries = holder.children
    const len = entries.length
    let i = 0
    let rowNumber = 1
    while (i < len) {
      if (isLaptop) {
        if (i + 4 <= len) {
          if (rowNumber % 2) {
            fourColumnRow(gallery, entries, i)
          } else {
            fourColumnReversedRow(gallery, entries, i)
          }
          i += 4
        } else if (i + 3 <= len) {
          if (rowNumber % 2) {
            threeColumnRow(gallery, entries, i)
          } else {
            threeColumnReversedRow(gallery, entries, i)
          }
          i += 3
        } else if (i + 2 <= len) {
          twoColumnRow(gallery, entries, i)
          i += 2
        } else {
          singleColumnRow(gallery, entries, i)
          i++
        }
      } else if (isTablet) {
        if (i + 2 <= len) {
          twoColumnRow(gallery, entries, i)
          i += 2
        } else {
          singleColumnRow(gallery, entries, i)
          i++
        }
      } else {
        singleColumnRow(gallery, entries, i)
        i++
      }
      rowNumber++
    }
  })

  // show full image on click
  const elements = document.getElementsByClassName('achievement-entry')
  const len = elements.length
  for (let i = 0; i < len; i++) {
    elements[i].onclick = function () {
      const achievements = document.getElementsByClassName('achievement-entry')
      const len2 = achievements.length
      for (let j = 0; j < len2; j++) {
        achievements[j].classList.toggle('hidden')
      }
      this.classList.toggle('achievement-details')
      this.classList.toggle('hidden')
      this.parentElement.classList.toggle('col-lg-12')
      this.parentElement.classList.toggle('col-md-12')
      this.parentElement.classList.toggle('col-sm-12')
      if (this.children.SmallImage.hasAttribute('active')) {
        const mainLogo = this.children.LargeImage.getAttribute('Style')
        this.children.LargeImage.setAttribute('active', true)
        this.children.SmallImage.removeAttribute('active')

        this.setAttribute('Style', mainLogo)
      } else {
        const mainLogo = this.children.SmallImage.getAttribute('Style')
        this.children.SmallImage.setAttribute('active', true)
        this.children.LargeImage.removeAttribute('active')
        this.setAttribute('Style', mainLogo)
      }

      if (this.children.caption !== undefined) {
        this.children.caption.classList.toggle('hidden')
      }
      if (this.children['enlarge-icon'] !== undefined) {
        this.getElementsByClassName('fa-xmark')[0].classList.toggle('hidden')
        this.getElementsByClassName('fa-magnifying-glass-plus')[0].classList.toggle('hidden')
      }
      if (this.children['achievement-title'] !== undefined) {
        this.children['achievement-title'].classList.toggle('hidden')
      }
    }
  }
}

['DOMContentLoaded', 'resize'].forEach((event) =>
  document.addEventListener(event, showAchievements))
