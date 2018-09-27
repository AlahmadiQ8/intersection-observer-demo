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
}
IntersectionObserverDemo.prototype.init = function() {
  if (observer) observer.disconnect()
  let isLeaving = false
  updateThreshold(this.threshold)
  updateRootMargin(
    this.rootMarginTop,
    this.rootMarginRight,
    this.rootMarginBottom,
    this.rootMarginLeft
  )

  const callback = function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isLeaving) {
        isLeaving = true
        $status.textContent = 'Entering'
        $capturingFrame.classList.add('animate')
      } else if (isLeaving) {
        isLeaving = false
        $status.textContent = 'Leaving'
        $capturingFrame.classList.add('animate')
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
  observer.observe($target)
}

// ----------------------------------------------------
// NOT PART OF THE DEMO

const $capturingFrame = document.getElementById('capturingFrame')
const $target = document.getElementById('observed')
const $thresholds = document.querySelectorAll('.threshold')
const $rootCopy = document.getElementById('rootCopy')
const $scrollArea = document.getElementById('scrollArea')
const $status = document.getElementById('status')

function addAnimationEvent() {
  $capturingFrame.addEventListener(
    'animationend',
    () => {
      $capturingFrame.classList.remove('animate')
    },
    false
  )
}

function updateRootMargin(top, right, bottom, left) {
  $capturingFrame.style.height = `${500 + top + bottom}px`
  $capturingFrame.style.marginTop = `-${top}px`
  $capturingFrame.style.width = `${500 + left + right}px`
  $capturingFrame.style.marginLeft = `-${left}px`
}

function updateThreshold(threshold) {
  $thresholds.forEach(element => {
    element.style.height = `${threshold * 100}%`
  })
}

addAnimationEvent()
$scrollArea.addEventListener('scroll', () => {
  $rootCopy.style.marginTop = `-${$scrollArea.scrollTop}px`
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
