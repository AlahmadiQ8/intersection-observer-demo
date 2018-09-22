import * as dat from 'dat.gui'
import '../styles/index.scss'

let observer

function IntersectionObserverDemo() {
  this.title = 'Options'
  this.root = document.getElementById('scrollArea')
  this.rootMarginTop = 0
  this.rootMarginRight = 0
  this.rootMarginBottom = 0
  this.rootMarginLeft = 0
  this.threshold = 0.5
  this.rootMargin = `${this.rootMarginTop}px ${this.rootMarginRight}px ${
    this.rootMarginBottom
  }px ${this.rootMarginLeft}px`
}
IntersectionObserverDemo.prototype.init = function() {
  if (observer) observer.disconnect()
  let isLeaving = false
  console.log('teeeeest')
  updateThreshold(this.threshold)
  updateRootMargin(
    this.rootMarginTop,
    this.rootMarginRight,
    this.rootMarginBottom,
    this.rootMarginLeft
  )

  const callback = function(entries, self) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isLeaving) {
        isLeaving = true
        $status.textContent = 'Entering'
      } else if (isLeaving) {
        isLeaving = false
        $status.textContent = 'Leaving'
      }
    })
  }

  observer = new IntersectionObserver(callback, {
    root: this.root,
    threshold: this.threshold,
    rootMargin: `${this.rootMarginTop}px ${this.rootMarginRight}px ${
      this.rootMarginBottom
    }px ${this.rootMarginLeft}px`,
  })
  const target = document.getElementById('observed')
  observer.observe(target)
}

// ----------------------------------------------------
// NOT PART OF THE DEMO

const $top = document.getElementById('rootMargin-top')
const $right = document.getElementById('rootMargin-right')
const $bottom = document.getElementById('rootMargin-bottom')
const $left = document.getElementById('rootMargin-left')
const $thresholds = document.querySelectorAll('.threshold')
const $rootCopy = document.getElementById('rootCopy')
const $scrollArea = document.getElementById('scrollArea')
const $status = document.getElementById('status')

function updateRootMargin(top, right, bottom, left) {
  $top.style.top = `-${top}`
  $right.style.right = `-${right}`
  $bottom.style.bottom = `-${bottom}`
  $left.style.left = `-${left}`
}

function updateThreshold(threshold) {
  $thresholds.forEach(function(element) {
    element.style.height = `${threshold * 100}%`
  })
}

$scrollArea.addEventListener('scroll', function(event) {
  $rootCopy.style.marginTop = -$scrollArea.scrollTop
})

const demo = new IntersectionObserverDemo()
const update = demo.init.bind(demo)
update()
const gui = new dat.GUI(demo)
gui.add(demo, 'title')
gui.add(demo, 'threshold', 0, 1).onChange(update)
gui.add(demo, 'rootMarginTop', 0, 100, 10).onChange(update)
gui.add(demo, 'rootMarginRight', 0, 100, 10).onChange(update)
gui.add(demo, 'rootMarginBottom', 0, 100, 10).onChange(update)
gui.add(demo, 'rootMarginLeft', 0, 100, 10).onChange(update)
