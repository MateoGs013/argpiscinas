import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, ScrollTrigger, animateSection, killScrollTriggers } from '@/animations'

/**
 * Composable for GSAP animations
 */
export function useAnimations() {
  const isReady = ref(false)

  onMounted(() => {
    isReady.value = true
    ScrollTrigger.refresh()
  })

  onUnmounted(() => {
    killScrollTriggers()
  })

  // Animate elements when they enter viewport
  function animateOnScroll(selector, options = {}) {
    if (!isReady.value) return

    const elements = document.querySelectorAll(selector)
    
    elements.forEach((element) => {
      gsap.from(element, {
        y: options.y || 40,
        opacity: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: options.start || 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    })
  }

  // Stagger animation for multiple elements
  function animateStagger(selector, options = {}) {
    if (!isReady.value) return

    const elements = document.querySelectorAll(selector)
    
    gsap.from(elements, {
      y: options.y || 40,
      opacity: 0,
      duration: options.duration || 0.8,
      stagger: options.stagger || 0.1,
      ease: options.ease || 'power2.out',
      scrollTrigger: {
        trigger: elements[0],
        start: options.start || 'top 85%',
        toggleActions: 'play none none none'
      }
    })
  }

  // Hero animation
  function animateHero(containerRef) {
    if (!containerRef.value) return

    const container = containerRef.value
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    const title = container.querySelector('.hero-title')
    const subtitle = container.querySelector('.hero-subtitle')
    const cta = container.querySelector('.hero-cta')
    const image = container.querySelector('.hero-image')

    if (title) {
      tl.from(title, { y: 60, opacity: 0, duration: 1 })
    }
    if (subtitle) {
      tl.from(subtitle, { y: 40, opacity: 0, duration: 0.8 }, '-=0.6')
    }
    if (cta) {
      tl.from(cta, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
    }
    if (image) {
      tl.from(image, { scale: 1.1, opacity: 0, duration: 1.2 }, '-=0.8')
    }

    return tl
  }

  // Reveal section
  function revealSection(sectionRef) {
    if (!sectionRef.value) return

    animateSection(sectionRef.value)
  }

  // Counter animation
  function animateCounter(element, endValue, options = {}) {
    const obj = { value: 0 }

    return gsap.to(obj, {
      value: endValue,
      duration: options.duration || 2,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString()
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })
  }

  return {
    isReady,
    gsap,
    ScrollTrigger,
    animateOnScroll,
    animateStagger,
    animateHero,
    revealSection,
    animateCounter
  }
}
