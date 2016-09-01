export const trackFB = function (...args) {
  if (!window.fbq) return
  window.fbq(...args)
}
