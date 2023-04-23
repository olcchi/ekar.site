import { gsap } from 'gsap'
export const useAnimation = (query: 'posts' | 'postsList' | 'index'): void => {
  switch (query) {
    case 'posts':
      return (() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5 } })
        tl.to('#backToWrapper', { y: 0, opacity: 1, delay: 0.2 })
          .to('#postsWrapper', { y: 0, opacity: 1 })
      })()
    case 'postsList':
      return (() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5 } })
        tl.to('#backToWrapper', { y: 0, opacity: 1, delay: 0.2 })
          .to('#postsListWrapper', { y: 0, opacity: 1 })
      })()
    case 'index':
      return (() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2' } })
        tl.to('#aboutMe', { opacity: 1, y: 0, delay: 0.2 })
          .to('#Project', { opacity: 1, y: 0 })
          .to('#Now', { opacity: 1, y: 0 })
      })()
    default:
      throw new Error(`Invalid query Value ${query} `)
  }
}
