import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// =====================
// Hero Animations
// =====================
export function animateHero(container) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(container.querySelector('.hero-title'), {
    y: 60,
    opacity: 0,
    duration: 1
  })
  .from(container.querySelector('.hero-subtitle'), {
    y: 40,
    opacity: 0,
    duration: 0.8
  }, '-=0.6')
  .from(container.querySelector('.hero-cta'), {
    y: 30,
    opacity: 0,
    duration: 0.6
  }, '-=0.4')
  .from(container.querySelector('.hero-image'), {
    scale: 1.1,
    opacity: 0,
    duration: 1.2
  }, '-=0.8')

  return tl
}

// =====================
// Scroll Reveal Animation
// =====================
export function animateOnScroll(elements, options = {}) {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    start: 'top 85%',
    toggleActions: 'play none none none'
  }

  const config = { ...defaults, ...options }

  gsap.from(elements, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    stagger: config.stagger,
    ease: config.ease,
    scrollTrigger: {
      trigger: elements[0] || elements,
      start: config.start,
      toggleActions: config.toggleActions
    }
  })
}

// =====================
// Section Reveal Animation
// =====================
export function animateSection(section, options = {}) {
  const defaults = {
    start: 'top 80%',
    toggleActions: 'play none none none'
  }

  const config = { ...defaults, ...options }

  // Animate section header
  const header = section.querySelector('.section-header')
  if (header) {
    gsap.from(header.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: header,
        start: config.start,
        toggleActions: config.toggleActions
      }
    })
  }

  // Animate cards/items
  const items = section.querySelectorAll('.animate-item')
  if (items.length > 0) {
    gsap.from(items, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: items[0],
        start: config.start,
        toggleActions: config.toggleActions
      }
    })
  }
}

// =====================
// Card Hover Animation
// =====================
export function animateCardHover(card) {
  const image = card.querySelector('img')
  const content = card.querySelector('.card-content')
  
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -8,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      duration: 0.3,
      ease: 'power2.out'
    })
    
    if (image) {
      gsap.to(image, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out'
      })
    }
  })

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      boxShadow: '0 10px 40px -15px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    })
    
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
    }
  })
}

// =====================
// Stagger Animation
// =====================
export function staggerReveal(elements, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }

  const config = { ...defaults, ...options }

  return gsap.from(elements, config)
}

// =====================
// Text Split Animation
// =====================
export function animateTextSplit(element, options = {}) {
  const defaults = {
    duration: 0.8,
    stagger: 0.02,
    ease: 'power2.out'
  }

  const config = { ...defaults, ...options }
  const text = element.textContent
  element.innerHTML = ''

  text.split('').forEach(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    element.appendChild(span)
  })

  return gsap.from(element.children, {
    y: 40,
    opacity: 0,
    duration: config.duration,
    stagger: config.stagger,
    ease: config.ease
  })
}

// =====================
// Counter Animation
// =====================
export function animateCounter(element, endValue, options = {}) {
  const defaults = {
    duration: 2,
    ease: 'power2.out'
  }

  const config = { ...defaults, ...options }
  const obj = { value: 0 }

  return gsap.to(obj, {
    value: endValue,
    duration: config.duration,
    ease: config.ease,
    onUpdate: () => {
      element.textContent = Math.round(obj.value)
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  })
}

// =====================
// Parallax Effect
// =====================
export function createParallax(element, speed = 0.5) {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

// =====================
// Fade In Up
// =====================
export function fadeInUp(element, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    start: 'top 85%'
  }

  const config = { ...defaults, ...options }

  gsap.from(element, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    scrollTrigger: {
      trigger: element,
      start: config.start,
      toggleActions: 'play none none none'
    }
  })
}

// =====================
// Image Reveal
// =====================
export function revealImage(container) {
  const image = container.querySelector('img')
  const overlay = container.querySelector('.image-overlay')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  if (overlay) {
    tl.to(overlay, {
      scaleX: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      transformOrigin: 'right center'
    })
  }

  tl.from(image, {
    scale: 1.2,
    duration: 1,
    ease: 'power2.out'
  }, overlay ? '-=0.4' : 0)

  return tl
}

// =====================
// Clean up ScrollTriggers
// =====================
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// =====================
// Refresh ScrollTriggers
// =====================
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger }
