/**
 * Alpine JS
 * Best to put it last so that all other potential JS is available
 * when components start getting initialized.
 */
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'
import intersect from '@alpinejs/intersect'
import breakpoint from 'alpinejs-breakpoints'

Alpine.plugin(intersect)
Alpine.plugin(breakpoint)
Alpine.plugin(collapse)
Alpine.plugin(focus)
window.Alpine = Alpine
window.AlpineBreakpointPluginBreakpointsList = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'xxxl',
]
Alpine.start()

// Accept HMR as per: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR')
  })
}
