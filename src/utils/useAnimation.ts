import { gsap } from 'gsap'
export const prerender = true
export const useAnimation = (query: 'posts' | 'postsList' | 'index'): void => {
  switch (query) {
    case 'posts':
      return (() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5 } })
        tl.from('#backToWrapper', { translateY: 12, opacity: 0, delay: 0.2 })
          .from('#postsWrapper', { translateY: 12, opacity: 0 })
      })()
    case 'postsList':
      return (() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5, opacity: 0 } })
        tl.from('#backToWrapper', { translateY: 12, delay: 0.2 })
          .from('#postsListWrapper', { translateY: 12 })
      })()
    case 'index':
      return (() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2' } })
        tl.from('#aboutMe', { opacity: 0, rotationX: 90, delay: 0.2 })
          .from('#Project', { opacity: 0, rotationX: 90 })
          .from('#Now', { opacity: 0, rotationX: 90 })
      })()
    default:
      throw new Error(`Invalid query Value ${query} `)
  }
}
