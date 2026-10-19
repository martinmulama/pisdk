const purgecss = require('@fullhuman/postcss-purgecss')

/*
 * The responsive rules stay readable in source. PurgeCSS runs only for the
 * production bundle, where it removes selectors that no page component can
 * render. The safelist covers the few classes composed at runtime by React
 * data, GSAP, and ScrollTrigger.
 */
const productionPurge = purgecss({
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: {
    standard: [
      'active',
      'is-open',
      'hero-is-ready',
      'rings-are-ready',
      'hero--mobile-merge',
      'mobile-nav-is-sticky',
      /^work-card--/,
      /^work-mobile-service--/,
      /^involvement-card--/,
      /^hero-work-handoff/,
      /^preloader-ring-handoff/,
    ],
  },
  // CSS animations and font declarations are deliberately retained. Their
  // references can be introduced by GSAP at runtime rather than in markup.
  keyframes: false,
  fontFace: false,
})

module.exports = {
  plugins: process.env.NODE_ENV === 'production' ? [productionPurge] : [],
}
