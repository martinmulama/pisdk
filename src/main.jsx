import { createRoot } from 'react-dom/client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import referenceImage from './assets/pisdk-hero-reference.png'
import storyDamagedHome from './assets/story-damaged-home.png'
import storyReclaimedScrap from './assets/story-reclaimed-scrap.png'
import storyRebuiltHome from './assets/story-rebuilt-home.png'
import storyCommunityChildren from './assets/story-community-children.png'
import heroFeature from './assets/hero-building-hope-hero-crop.png'
import workRecoveryIcon from './assets/work-icon-recovery.png'
import workCommunityIcon from './assets/work-icon-community.png'
import workTrainingIcon from './assets/work-icon-training.png'
import workConsultationIcon from './assets/work-icon-consultation.png'
import workResearchIcon from './assets/work-icon-research.png'
import workForumsIcon from './assets/work-icon-forums.png'
import impactBeforeRuins from './assets/impact-before-ruins.png'
import impactRebuildWorker from './assets/impact-rebuild-worker.png'
import impactFoundationOfHope from './assets/impact-foundation-of-hope.png'
import getInvolvedPartnerIcon from './assets/get-involved-icon-partner.png'
import getInvolvedVisitIcon from './assets/get-involved-icon-visit.png'

gsap.registerPlugin(ScrollTrigger)

const menu = ['Home', 'About us', 'Our work', 'Current pilots', 'Get involved', 'Contact']

const footerLinkRows = [
  [
    ['About', '#top'],
    ['Our work', '#our-work'],
    ['Join us', '#get-involved'],
    ['Contact', '#contact'],
  ],
  [
    ['Media Center', '#current-pilots'],
    ['Careers', '#get-involved'],
    ['Discovery Center', '#our-work'],
    ['Give with us', '#get-involved'],
  ],
  [
    ['Our Projects', '#current-pilots'],
    ['Policies & Governance', '#top'],
    ['Terms of Use', '#top'],
  ],
]

const workServices = [
  {
    id: 'recovery',
    title: <>Deconstruction &<br />Material Recovery</>,
    copy: 'Systematic dismantling of buildings to salvage doors, windows, timber, steel, masonry, and roofing, smartware etc keeping waste out of landfills and the Nairobi River Basin.',
    icon: workRecoveryIcon,
  },
  {
    id: 'community',
    title: <>Community<br />Rebuilding</>,
    copy: 'Turning reclaimed materials into dignified community infrastructure, starting with the Foundation of Hope Youth Centre in Kibera.',
    icon: workCommunityIcon,
  },
  {
    id: 'training',
    title: <>Circular Economy<br />Training</>,
    copy: 'Training local youth, women, and waste pickers in deconstruction, waste sorting, and circular construction.',
    icon: workTrainingIcon,
  },
  {
    id: 'consultation',
    title: <>Circular<br />Consultation</>,
    copy: 'Advising contractors, developers, and county governments on sustainable materials, waste management, and circular economy policy.',
    icon: workConsultationIcon,
  },
  {
    id: 'research',
    title: 'Research & Innovation',
    copy: 'Conducting research on the structural integrity of integrating new materials and sustainable materials into construction.',
    icon: workResearchIcon,
  },
  {
    id: 'forums',
    title: 'ESJP Kenya Forums',
    copy: 'Creating dialogue spaces for engineers, innovators, and advocates committed to justice-oriented engineering.',
    icon: workForumsIcon,
  },
]

const involvementWays = [
  {
    id: 'donate',
    title: 'Donate Materials',
    copy: <>Doors, windows, timber,<br /> steel, and masonry—<br /> channelled into community<br /> housing.</>,
    icon: workRecoveryIcon,
  },
  {
    id: 'partner',
    title: 'Partner With Us',
    copy: <>CSR partnerships,<br /> element sponsorship,<br /> fiscal sponsorship.</>,
    icon: getInvolvedPartnerIcon,
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    copy: <>Join us in Kibera—<br /> volunteers, researchers,<br /> and interns welcome.</>,
    icon: workCommunityIcon,
  },
  {
    id: 'visit',
    title: 'Visit Our Projects',
    copy: <>See our work firsthand,<br /> site visits available.</>,
    icon: getInvolvedVisitIcon,
  },
]

const preloaderStats = [
  {
    eyebrow: 'Over',
    value: '2,400',
    detail: 'tonnes',
    support: 'of waste every day',
    mobileIntro: 'Nairobi generates',
    label: 'Nairobi generates',
    color: '#f3a16d',
    ringColor: '#efa06b',
  },
  {
    eyebrow: 'Only',
    value: '5%',
    detail: '',
    support: 'of C&D waste is recycled.',
    label: 'Recycling',
    color: '#cce4a8',
    ringColor: '#9caf87',
  },
  {
    eyebrow: 'Over',
    value: '60%',
    detail: '',
    support: 'of the population live in informal settlements.',
    label: 'Informal housing',
    color: '#f5f3e8',
    ringColor: '#9caf87',
  },
  {
    eyebrow: 'A',
    value: '2m',
    detail: '',
    support: 'unit housing deficit.',
    label: 'Housing',
    color: '#9ecb9d',
    ringColor: '#9caf87',
  },
]

function StoryImage({ className, label, image }) {
  return <div className={`story-image ${className}`} role="img" aria-label={label} style={{ '--story-image': `url(${image})` }} />
}

/* Compact screens keep the hero story in one SVG coordinate system. That lets
 * circles travel into a shared destination without rasterising the images or
 * relying on opacity changes. Desktop and reduced-motion retain their own
 * established markup. */
function MobileHeroMerge() {
  const centreX = 195
  // Four generous rings with an intentional breathing gap between them. The
  // complete stack remains inside the mobile hero viewport.
  const radius = 68
  const targetY = 72
  const sourceRings = [
    { id: 'materials', image: storyReclaimedScrap, y: 226, label: 'Reclaimed construction materials' },
    { id: 'rebuilt', image: storyRebuiltHome, y: 380, label: 'A rebuilt home made from reclaimed materials' },
    { id: 'children', image: storyCommunityChildren, y: 534, label: 'Children in a local community' },
  ]
  const imageBox = (y) => ({ x: centreX - radius, y: y - radius, width: radius * 2, height: radius * 2 })

  return (
    <section className="mobile-hero-merge" aria-label="PISDK mission story">
      <div className="mobile-hero-merge__viewport">
        <svg className="mobile-hero-merge__canvas" viewBox="0 0 390 620" role="img" aria-label="Four community story circles becoming one rebuilding story">
          <defs>
            <clipPath id="mobile-merge-target-clip"><circle data-mobile-merge-mask="target" cx={centreX} cy={targetY} r={radius} /></clipPath>
            <clipPath id="mobile-merge-final-clip"><circle data-mobile-merge-final-clip cx={centreX} cy={sourceRings[2].y} r="0" /></clipPath>
            {sourceRings.map(({ id, y }) => <clipPath key={id} id={`mobile-merge-${id}-clip`}><circle data-mobile-merge-mask={id} cx={centreX} cy={y} r={radius} /></clipPath>)}
          </defs>

          <g data-mobile-merge-target data-mobile-merge-source="target" data-mobile-merge-ring data-mobile-merge-y={targetY}>
            <circle data-mobile-merge-fill className="mobile-merge__fill" cx={centreX} cy={targetY} r={radius} />
            <image {...imageBox(targetY)} href={storyDamagedHome} preserveAspectRatio="xMidYMid slice" clipPath="url(#mobile-merge-target-clip)" />
            <circle data-mobile-merge-ring-outline className="mobile-merge__ring mobile-merge__ring--warm" cx={centreX} cy={targetY} r={radius} />
          </g>

          {sourceRings.map(({ id, image, y, label }) => (
            <g key={id} data-mobile-merge-source={id} data-mobile-merge-final={id === 'children' ? '' : undefined} data-mobile-merge-ring data-mobile-merge-y={y} aria-label={label}>
              <circle data-mobile-merge-fill className="mobile-merge__fill" cx={centreX} cy={y} r={radius} />
              <image {...imageBox(y)} href={image} preserveAspectRatio="xMidYMid slice" clipPath={`url(#mobile-merge-${id}-clip)`} />
              {id === 'children' && <image {...imageBox(y)} href={impactRebuildWorker} preserveAspectRatio="xMidYMid slice" clipPath="url(#mobile-merge-final-clip)" />}
              <circle data-mobile-merge-ring-outline className="mobile-merge__ring" cx={centreX} cy={y} r={radius} />
            </g>
          ))}
        </svg>

      </div>
      <section className="mobile-hero-merge__mission" aria-label="Our mission">
        <span className="mobile-hero-merge__rule" />
        <div>
          <p>At the Paragon Institute of Sustainable Development Kenya (PISDK), we advance circular economy solutions in construction and waste management. Our mission is to prove that sustainability equals affordability.</p>
          <p>We do this by deconstructing buildings instead of demolishing them, recovering valuable materials, and channeling them back into community housing and infrastructure at prices co-created with the people we serve.</p>
        </div>
      </section>
    </section>
  )
}

function Brand() {
  return <a className="brand" href="#top" aria-label="PISDK — Paragon Institute of Sustainable Development Kenya" />
}

function DesktopNav() {
  const navRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [indicatorY, setIndicatorY] = useState(0)
  const indicatorIndex = hoveredIndex ?? activeIndex

  const syncIndicator = useCallback(() => {
    const nav = navRef.current
    const target = nav?.querySelector(`[data-nav-index="${indicatorIndex}"]`)
    if (target) setIndicatorY(target.offsetTop + target.offsetHeight / 2)
  }, [indicatorIndex])

  useLayoutEffect(() => {
    syncIndicator()
    window.addEventListener('resize', syncIndicator)
    return () => window.removeEventListener('resize', syncIndicator)
  }, [syncIndicator])

  return (
    <nav
      ref={navRef}
      className="desktop-nav"
      aria-label="Primary navigation"
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ '--nav-indicator-y': `${indicatorY}px` }}
    >
      {menu.map((item, index) => (
        <a
          className={index === activeIndex ? 'active' : ''}
          data-nav-index={index}
          href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
          key={item}
          aria-current={index === activeIndex ? 'page' : undefined}
          onMouseEnter={() => setHoveredIndex(index)}
          onFocus={() => setHoveredIndex(index)}
          onBlur={() => setHoveredIndex(null)}
          onClick={() => setActiveIndex(index)}
        >
          {item}
        </a>
      ))}
      <span className="desktop-nav__indicator" aria-hidden="true" />
    </nav>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className={`mobile-menu-toggle${isOpen ? ' is-open' : ''}`}
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="mobile-navigation" className={`mobile-nav${isOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
        {menu.map((item) => (
          <a
            href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
            key={item}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>
    </>
  )
}

function HeroFeature() {
  return (
    <div className="feature-image">
      <img src={heroFeature} alt="A craftsperson building with reclaimed materials" />
    </div>
  )
}

function WorkCard({ service }) {
  return (
    <article className={`work-card work-card--${service.id}`}>
      <img className="work-card__icon" src={service.icon} alt="" aria-hidden="true" />
      <h3>{service.title}</h3>
      <p>{service.copy}</p>
    </article>
  )
}

function MobileWorkService({ service }) {
  return (
    <article className={`work-mobile-service work-mobile-service--${service.id}`}>
      <div className="work-mobile-service__circle">
        <img src={service.icon} alt="" aria-hidden="true" />
        <h3>{service.title}</h3>
      </div>
      <p>{service.copy}</p>
    </article>
  )
}

// Identical SVG command structures allow the CTA's path to interpolate from a
// pill into the ellipse that becomes a true circle after its final transform.
// Keeping this as a tiny path calculation avoids a heavier morphing plugin.
function mobileExploreMorphPath(progress = 0) {
  const mix = (from, to) => from + (to - from) * progress
  const left = mix(24, 95)
  const right = mix(166, 95)
  const controlNear = mix(179.25, 147.5)
  const controlFar = mix(10.75, 42.5)
  return `M ${left} 0 L ${right} 0 C ${controlNear} 0 190 10.75 190 24 C 190 37.25 ${controlNear} 48 ${right} 48 L ${left} 48 C ${controlFar} 48 0 37.25 0 24 C 0 10.75 ${controlFar} 0 ${left} 0 Z`
}

function WhatWeDo() {
  return (
    <section className="what-we-do" id="our-work" aria-labelledby="work-heading">
      <div className="work-intro">
        <h2 id="work-heading">What We Do: A Complete<br />Circular Ecosystem.</h2>
        <a className="work-intro__button" href="#current-pilots">Explore our work <span aria-hidden="true">→</span></a>
      </div>

      <div className="work-mobile-scroll-list">
        {workServices.map((service) => <MobileWorkService key={service.id} service={service} />)}
      </div>

      <div className="work-mobile-stage">
        <div className="work-rail" aria-hidden="true" />
        <div className="work-top-grid">
          {workServices.slice(0, 4).map((service) => <WorkCard key={service.id} service={service} />)}
        </div>
        <div className="work-lower-cards">
          {workServices.slice(4).map((service) => <WorkCard key={service.id} service={service} />)}
        </div>
      </div>

      <p className="work-summary">We work across the entire circular ecosystem—<br />{' '}connecting people, resources and knowledge<br />{' '}to create lasting change in Kenya’s communities.</p>
      <div className="work-mobile-outro">
        <a className="work-mobile-outro__button" href="#current-pilots">
          <svg className="work-mobile-outro__morph" viewBox="0 0 190 48" preserveAspectRatio="none" aria-hidden="true">
            <path data-mobile-explore-morph d={mobileExploreMorphPath()} />
          </svg>
          <span className="work-mobile-outro__label">Explore our work</span>
          <span className="work-mobile-outro__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

function ImpactVisual({ className, label, image, showPlay = false }) {
  return (
    <div className={`impact-visual ${className}`}>
      <img src={image} alt={label} />
      <span className="impact-visual__ring" aria-hidden="true" />
      {showPlay && <span className="impact-visual__play" aria-hidden="true" />}
    </div>
  )
}

function Impact() {
  return (
    <section className="impact" id="current-pilots" aria-labelledby="impact-heading">
      <ImpactVisual className="impact-visual--before" image={impactBeforeRuins} label="A collapsed adobe home before the rebuild" />
      <ImpactVisual className="impact-visual--feature" image={impactRebuildWorker} label="A craftsperson rebuilding with earth blocks" showPlay />
      <ImpactVisual className="impact-visual--after" image={impactFoundationOfHope} label="The rebuilt Foundation of Hope Youth Centre" />

      <p className="impact-label impact-label--before">Before</p>
      <p className="impact-label impact-label--after">After</p>

      <div className="impact-overview">
        <h2 id="impact-heading">Our Impact</h2>
        <p>To date, we have recovered more than <strong>90 tonnes</strong> of materials, trained more than <strong>20 young people</strong>, and rebuilt one section of the Foundation of Hope — and we are still building.</p>
      </div>

      <section className="impact-story" aria-labelledby="impact-story-heading">
        <h3 id="impact-story-heading">The Foundation of Hope —<br />An Unfolding Story</h3>
        <p>The Foundation of Hope Youth Centre is a vital community anchor in Kibera, serving over 300 vulnerable children, youth, and families. It is a safe haven, a launchpad for talent, and a community hub.</p>
        <p>During the March 2026 heavy rains, a section of the wall collapsed. We rebuilt it using reclaimed materials. But the work is not finished. Every repaired section reveals another section in need.</p>
      </section>

      <a className="impact-cta" href="#get-involved">Support the Rebuild <span aria-hidden="true">→</span></a>

      <div className="tagline impact-tagline" aria-label="People, materials, environment, circular construction">
        <span>People</span><b>/</b><span>Materials</span><b>/</b><span>Environment</span><b>/</b><span>Circular construction</span>
      </div>
    </section>
  )
}

function InvolvementCard({ way }) {
  return (
    <article className={`involvement-card involvement-card--${way.id}`}>
      <img className="involvement-card__icon" src={way.icon} alt="" aria-hidden="true" />
      <h3>{way.title}</h3>
      <p>{way.copy}</p>
    </article>
  )
}

function GetInvolved() {
  return (
    <section className="get-involved" id="get-involved" aria-labelledby="get-involved-heading">
      <div className="get-involved__backdrop" aria-hidden="true" />
      <div className="get-involved__intro">
        <h2 id="get-involved-heading">Get Involved</h2>
        <p>See how you can help and what it means.</p>
      </div>

      <div className="involvement-options">
        {involvementWays.map((way) => <InvolvementCard key={way.id} way={way} />)}
      </div>

      <a className="get-involved__cta" href="#contact">Start a conversation <span aria-hidden="true">→</span></a>
    </section>
  )
}

function FooterSocialIcon({ name }) {
  const icons = {
    Facebook: <path d="M14.2 23v-9h3.1l.5-3.5h-3.6V8.3c0-1 .3-1.7 1.8-1.7H18V3.5c-.4-.1-1.4-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v2.6H7.7V14h3.1v9h3.4Z" />,
    X: <path d="m7 6 10.5 12M17 6 6.5 18" />,
    LinkedIn: <><path d="M7.2 9.5v8.8M7.2 6.5h.1" /><path d="M11.1 18.3v-5c0-1.8 1.1-3 2.8-3 1.8 0 2.9 1.2 2.9 3v5M11.1 12.9v-2.5" /></>,
    Instagram: <><rect x="5.5" y="5.5" width="13" height="13" rx="3.4" /><circle cx="12" cy="12" r="3" /><path d="M16.2 7.9h.1" /></>,
    YouTube: <><rect x="4.7" y="7" width="14.6" height="10" rx="3" /><path d="m10.5 10 4 2-4 2v-4Z" fill="currentColor" stroke="none" /></>,
  }

  return (
    <a className="footer-social__link" href="#contact" aria-label={name}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{icons[name]}</svg>
    </a>
  )
}

function FooterLeaf() {
  return (
    <svg className="footer-principles__leaf" viewBox="0 0 54 72" aria-hidden="true">
      <path d="M25.5 68.5c.1-18.8 2.8-33.8 13.2-47.3" />
      <path d="M27 42.2C12.6 40.7 4.8 32.7 3.5 19.5c13.3 1.3 21.1 9.1 23.5 22.7Z" />
      <path d="M31.3 30.6C32.5 16.1 40.2 7.9 52.1 4.5c.1 13.5-6.7 22.4-20.8 26.1Z" />
      <path d="M25.8 53.2C15.6 53.5 8.5 49 5.3 40.6c10.2-.7 17.2 3.2 20.5 12.6Z" />
    </svg>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__wordmark" aria-label="PISDK">PISDK</div>
      <span className="site-footer__divider" aria-hidden="true" />
      <p className="site-footer__statement">We are turning waste<br />into homes, Creating jobs<br />and building dignity.</p>

      <nav className="site-footer__links" aria-label="Footer navigation">
        {footerLinkRows.map((row, rowIndex) => (
          <div className="site-footer__link-row" key={rowIndex}>
            {row.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </div>
        ))}
      </nav>

      <div className="footer-social" aria-label="Social media">
        {['Facebook', 'X', 'LinkedIn', 'Instagram', 'YouTube'].map((name) => <FooterSocialIcon key={name} name={name} />)}
      </div>

      <p className="site-footer__copyright">© 2026 PISDK. All rights reserved.</p>
      <div className="footer-principles" aria-label="People, materials, environment, circular construction">
        <FooterLeaf />
        <span>People</span><b>/</b><span>Materials</span><b>/</b><span>Environment</span><b>/</b><span>Circular construction</span>
      </div>
    </footer>
  )
}

function Preloader({ isLeaving, progress, onExitComplete }) {
  const preloaderRef = useRef(null)
  const sequenceRef = useRef(null)
  const dotRefs = useRef([])
  const copyRefs = useRef([])
  const captionRefs = useRef([])
  const activeIndex = Math.min(preloaderStats.length - 1, Math.floor(progress / (100 / preloaderStats.length)))
  const previousIndex = useRef(-1)

  const getSizes = useCallback(() => {
    const compact = window.matchMedia('(max-width: 860px), (max-width: 1100px) and (max-height: 900px)').matches
    const mobile = window.innerWidth <= 600
    const dot = mobile
      ? Math.min(18, Math.max(14, window.innerWidth * .052))
      : compact
        ? Math.min(32, Math.max(24, window.innerWidth * .075))
      : Math.min(36, Math.max(28, window.innerWidth * .02))
    // On phones, use the available height as well as the width. This lets the
    // active statistic use the generous portrait space without colliding with
    // the earlier/later knots on shorter handsets.
    const expanded = mobile
      ? Math.min(196, Math.max(154, Math.min(window.innerWidth * .56, window.innerHeight * .34)))
      : compact
        ? Math.min(246, Math.max(190, Math.min(window.innerWidth * .34, window.innerHeight * .29)))
      : Math.min(218, Math.max(176, Math.min(window.innerWidth * .12, window.innerHeight * .26)))

    return { dot, expanded }
  }, [])

  useLayoutEffect(() => {
    if (isLeaving) return undefined

    const dots = dotRefs.current.filter(Boolean)
    const copies = copyRefs.current.filter(Boolean)
    const captions = captionRefs.current.filter(Boolean)
    const activeDot = dots[activeIndex]
    const activeCopy = copies[activeIndex]
    const activeCaption = captions[activeIndex]
    if (!activeDot || !activeCopy || !activeCaption) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const { dot, expanded } = getSizes()
    const previousDot = dots[previousIndex.current]
    const previousCopy = copies[previousIndex.current]
    const previousCaption = captions[previousIndex.current]
    const timeline = gsap.timeline()
    if (previousIndex.current === -1) {
      gsap.set(dots, { width: dot, height: dot })
      gsap.set([...copies, ...captions], { autoAlpha: 0, y: 8 })
    }

    if (previousDot && previousIndex.current !== activeIndex) {
      timeline
        .to([previousCopy, previousCaption], { autoAlpha: 0, y: -7, duration: reducedMotion ? .01 : .16, ease: 'power1.out' }, 0)
        .to(previousDot, { width: dot, height: dot, duration: reducedMotion ? .01 : .44, ease: 'power3.inOut' }, 0)
    }

    timeline
      .to(activeDot, { width: expanded, height: expanded, duration: reducedMotion ? .01 : .58, ease: 'power3.inOut' }, previousDot ? .06 : 0)
      .to(activeCopy, { autoAlpha: 1, y: 0, duration: reducedMotion ? .01 : .28, ease: 'power2.out' }, previousDot ? .28 : .22)
      .to(activeCaption, { autoAlpha: 1, y: 0, duration: reducedMotion ? .01 : .24, ease: 'power2.out' }, previousDot ? .34 : .29)

    previousIndex.current = activeIndex
    return () => timeline.kill()
  }, [activeIndex, getSizes, isLeaving])

  useLayoutEffect(() => {
    if (!isLeaving || !preloaderRef.current || !sequenceRef.current) return undefined

    const preloader = preloaderRef.current
    const sequence = sequenceRef.current
    const dots = dotRefs.current.filter(Boolean)
    const copies = copyRefs.current.filter(Boolean)
    const captions = captionRefs.current.filter(Boolean)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Compact tablets use the same vertical handoff as phones. The former
    // width-only test selected hidden desktop rings in tablet portrait, which
    // made the curtain resolve without a visible destination.
    const isCompactStory = window.matchMedia('(max-width: 860px), (max-width: 1100px) and (max-height: 900px)').matches
    const targets = isCompactStory
      ? Array.from(document.querySelectorAll('[data-mobile-merge-ring]'))
      : Array.from(document.querySelectorAll('.story-image'))
    const { dot } = getSizes()
    const handoffLayer = document.createElement('div')
    handoffLayer.className = 'preloader-ring-handoff'
    document.body.appendChild(handoffLayer)

    const createTravellingDots = () => dots.map((source, index) => {
      const bounds = source.getBoundingClientRect()
      const travellingDot = document.createElement('div')
      travellingDot.className = 'preloader-ring-handoff__dot'
      travellingDot.style.left = `${bounds.left + bounds.width / 2}px`
      travellingDot.style.top = `${bounds.top + bounds.height / 2}px`
      travellingDot.style.width = `${dot}px`
      travellingDot.style.height = `${dot}px`
      travellingDot.style.boxSizing = 'border-box'
      travellingDot.style.border = `${dot / 2}px solid ${preloaderStats[index].color}`
      handoffLayer.appendChild(travellingDot)
      return travellingDot
    })

    // The handoff dots are separate from the sequence so their final motion is
    // not clipped by the preloader while the hero becomes visible underneath.
    const travellingDots = createTravellingDots()
    const targetBounds = (index) => targets[index]?.getBoundingClientRect()
    const exit = gsap.timeline({
      onComplete: () => {
        handoffLayer.remove()
        onExitComplete()
      },
    })

    exit
      .to([...copies, ...captions], { autoAlpha: 0, y: -8, duration: reducedMotion ? .01 : .16, ease: 'power1.in' }, 0)
      .to(dots, { width: dot, height: dot, duration: reducedMotion ? .01 : .32, ease: 'power3.inOut' }, 0)
      .to(sequence, { autoAlpha: 0, duration: reducedMotion ? .01 : .16, ease: 'power1.out' }, .14)
      // On compact screens the curtain rises from its lower edge, following
      // the same vertical path as the knots and destination hero rings.
      .to(preloader, { clipPath: isCompactStory ? 'inset(0 0 100% 0)' : 'inset(0 0 0 100%)', duration: reducedMotion ? .01 : .72, ease: 'power1.inOut' }, reducedMotion ? .01 : .28)
      .to(travellingDots, {
        left: (index) => {
          const target = targetBounds(index)
          return target ? target.left + target.width / 2 : window.innerWidth / 2
        },
        top: (index) => {
          const target = targetBounds(index)
          return target ? target.top + target.height / 2 : window.innerHeight / 2
        },
        width: (index) => targetBounds(index)?.width ?? dot,
        height: (index) => targetBounds(index)?.height ?? dot,
        borderWidth: (index) => (targetBounds(index)?.width ?? dot) * (isCompactStory ? .024 : .055),
        borderColor: (index) => preloaderStats[index].ringColor,
        duration: reducedMotion ? .01 : .72,
        ease: 'power2.inOut',
      }, reducedMotion ? .01 : .28)

    return () => {
      exit.kill()
      handoffLayer.remove()
    }
  }, [getSizes, isLeaving, onExitComplete])

  return (
    <section
      ref={preloaderRef}
      className={`preloader${isLeaving ? ' preloader--leaving' : ''}`}
      aria-label="Loading PISDK"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="preloader-sequence" ref={sequenceRef} role="progressbar" aria-label="Loading the PISDK homepage" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
        <span className="preloader-sequence__line" aria-hidden="true" />
        {preloaderStats.map((stat, index) => (
          <div className="preloader-step" key={stat.label || stat.value}>
            <div className="preloader-dot" ref={(node) => { dotRefs.current[index] = node }} style={{ '--dot-color': stat.color }}>
              <div className="preloader-dot__copy" ref={(node) => { copyRefs.current[index] = node }}>
              {stat.mobileIntro && <small className="preloader-dot__mobile-label">{stat.mobileIntro}</small>}
                <span className="preloader-dot__metric">
                  <i>{stat.eyebrow}</i>
                  <strong>{stat.value}</strong>
                </span>
                {stat.detail && <em>{stat.detail}</em>}
                <small className="preloader-dot__mobile-support">{stat.support}</small>
              </div>
            </div>
            <div className="preloader-step__caption" ref={(node) => { captionRefs.current[index] = node }}>
              {stat.support && <span>{stat.support}</span>}
              {stat.label && <small>{stat.label}</small>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [progress, setProgress] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)
  const [isHeroReady, setIsHeroReady] = useState(false)
  const [isRingsReady, setIsRingsReady] = useState(false)
  const [usesMobileMerge, setUsesMobileMerge] = useState(() => (
    typeof window !== 'undefined'
    && window.matchMedia('(max-width: 860px), (max-width: 1100px) and (max-height: 900px)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  const pageRef = useRef(null)

  const completePreloader = useCallback(() => setIsPreloaderDone(true), [])

  useEffect(() => {
    // Phones and compact tablets share the vertical hero story. Desktop keeps
    // its independent, horizontal ring handoff from 861px upward.
    const mobile = window.matchMedia('(max-width: 860px), (max-width: 1100px) and (max-height: 900px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setUsesMobileMerge(mobile.matches && !reduced.matches)

    update()
    mobile.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      mobile.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!isPreloaderDone) return undefined
    const revealFrame = requestAnimationFrame(() => setIsHeroReady(true))
    return () => cancelAnimationFrame(revealFrame)
  }, [isPreloaderDone])

  useEffect(() => {
    if (!isPreloaderDone) return undefined

    // Fullscreen, browser chrome changes, and device rotation can alter both
    // viewport units and the measured positions used by the scroll-scrubbed
    // handoffs. Refresh only after the viewport has settled for two frames so
    // every section recalculates from one stable coordinate system.
    let firstFrame = 0
    let settledFrame = 0
    const refreshAfterViewportChange = () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(settledFrame)
      firstFrame = requestAnimationFrame(() => {
        settledFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
      })
    }

    const viewport = window.visualViewport
    window.addEventListener('resize', refreshAfterViewportChange)
    window.addEventListener('orientationchange', refreshAfterViewportChange)
    document.addEventListener('fullscreenchange', refreshAfterViewportChange)
    viewport?.addEventListener('resize', refreshAfterViewportChange)
    document.fonts?.ready.then(refreshAfterViewportChange).catch(() => {})
    refreshAfterViewportChange()

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(settledFrame)
      window.removeEventListener('resize', refreshAfterViewportChange)
      window.removeEventListener('orientationchange', refreshAfterViewportChange)
      document.removeEventListener('fullscreenchange', refreshAfterViewportChange)
      viewport?.removeEventListener('resize', refreshAfterViewportChange)
    }
  }, [isPreloaderDone])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Four quiet, readable statistics—one state per dot—prepare the story
    // without delaying the actual page with image decoding.
    const duration = reducedMotion ? 80 : 7200
    let frame
    let exitTimer
    const startedAt = performance.now()

    const updateProgress = (now) => {
      // Keep the conic-gradient angle fractional. Whole-percent steps create
      // visible ticks around a large loading ring.
      const nextProgress = Math.min(100, ((now - startedAt) / duration) * 100)
      setProgress(nextProgress)

      if (nextProgress < 100) {
        frame = requestAnimationFrame(updateProgress)
        return
      }

      exitTimer = window.setTimeout(() => {
        // Let the four hero rings settle beneath the outgoing preloader. When
        // the homepage first becomes touchable, their diameter is already at
        // its final resting size and ready for the Work handoff.
        setIsRingsReady(true)
        setIsLeaving(true)
      }, reducedMotion ? 0 : 150)
    }

    frame = requestAnimationFrame(updateProgress)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(exitTimer)
    }
  }, [])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !usesMobileMerge || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(max-width: 860px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (max-width: 1100px) and (max-height: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const chapter = scope.querySelector('.mobile-hero-merge')
      const target = scope.querySelector('[data-mobile-merge-target]')
      const finalMask = scope.querySelector('[data-mobile-merge-final-clip]')
      const canvas = scope.querySelector('.mobile-hero-merge__canvas')
      const viewport = scope.querySelector('.mobile-hero-merge__viewport')
      const sources = Array.from(scope.querySelectorAll('[data-mobile-merge-source]:not([data-mobile-merge-target])'))
      const finalCircle = scope.querySelector('[data-mobile-merge-final]')
      const mission = scope.querySelector('.mobile-hero-merge__mission')

      if (!chapter || !target || !finalMask || !canvas || !viewport || sources.length !== 3 || !finalCircle || !mission) return undefined

      const targetY = Number(target.dataset.mobileMergeY)
      const getSourceY = (source) => Number(source.dataset.mobileMergeY)
      const getMask = (source) => scope.querySelector(`[data-mobile-merge-mask="${source.dataset.mobileMergeSource}"]`)
      const ringRadius = Number(getMask(target)?.getAttribute('r'))
      const getFinalGeometry = () => {
        const viewBox = canvas.viewBox.baseVal
        const bounds = viewport.getBoundingClientRect()
        const scale = Math.min(bounds.width / viewBox.width, bounds.height / viewBox.height)
        const verticalInset = (bounds.height - viewBox.height * scale) / 2
        // Reserve a real visual clearance below the completed circle. This
        // includes its non-scaling outline and avoids a lower-edge crop when
        // tablet browser chrome reduces the stable viewport height.
        const settleInset = 18
        // Match the mobile Impact film's *outer* diameter exactly. SVG circle
        // geometry sits beneath its stroke, so reserve the 7px outline inside
        // that diameter rather than letting the scaled border overflow it.
        const finalRingWidth = 7
        // On a phone the chapter spans the viewport, but on a tablet it is
        // deliberately centred inside a narrower reading column. Never size
        // the final circle from the wider window alone: it would extend past
        // that column and look clipped at both sides. The smaller value keeps
        // the film generous while guaranteeing its full outline remains in
        // view at every compact breakpoint.
        const finalDiameter = Math.min(
          window.innerWidth - 20 - finalRingWidth,
          bounds.width - finalRingWidth - 2,
          bounds.height - (settleInset * 2) - finalRingWidth,
        )
        const finalRadius = finalDiameter / 2
        const visualFinalRadius = finalRadius + finalRingWidth / 2
        const finalScale = finalDiameter / (ringRadius * 2 * scale)
        const desiredCentre = Math.max(visualFinalRadius + 16, Math.min(220, window.innerHeight * .25))
        const settledCentre = Math.max(
          visualFinalRadius + settleInset,
          bounds.height - visualFinalRadius - settleInset,
        )
        // The circle travels only as far as its fully visible resting point;
        // the following mission copy stays in normal document flow below it.
        const scrollDistance = Math.max(48, settledCentre - desiredCentre)

        return {
          scrollDistance,
          finalScale,
          finalY: (settledCentre - verticalInset) / scale,
        }
      }

      gsap.set(target, { scale: 1, svgOrigin: `195 ${targetY}`, transformOrigin: '50% 50%' })
      gsap.set(finalMask, { attr: { r: 0 } })
      gsap.set(mission, { y: 0, force3D: true })
      sources.forEach((source) => {
        gsap.set(source, { x: 0, y: 0, scale: 1, svgOrigin: `195 ${getSourceY(source)}`, transformOrigin: '50% 50%' })
      })

      const handoff = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: chapter,
          // This runs entirely in normal document flow—no fixed/sticky stage
          // and no ScrollTrigger pin spacer. The handoff completes as the
          // Let the heading leave first, then use a short, ordinary scroll
          // range. The start cannot be below the initial viewport or the
          // timeline would initialise part-way through on first load.
          start: 'top top',
          end: () => `+=${Math.round(getFinalGeometry().scrollDistance)}`,
          scrub: .55,
          invalidateOnRefresh: true,
        },
      })

      // Merge only with the immediate circle below. The top ring joins the
      // second, that combined story joins the third, then the third joins the
      // bottom ring. Short local paths prevent any visible criss-crossing.
      const mergePlan = [
        { incoming: target, receiver: sources[0], receiverScale: 1.16 },
        { incoming: sources[0], receiver: sources[1], receiverScale: 1.35 },
        { incoming: sources[1], receiver: sources[2], receiverScale: () => getFinalGeometry().finalScale },
      ]
      mergePlan.forEach(({ incoming, receiver, receiverScale }, index) => {
        const mask = getMask(incoming)
        const outline = incoming.querySelector('[data-mobile-merge-ring-outline]')
        const fill = incoming.querySelector('[data-mobile-merge-fill]')
        if (!mask || !outline || !fill) return
        const at = index * .33
        const receiverY = getSourceY(receiver)

        handoff
          .to(incoming, {
            y: receiverY - getSourceY(incoming),
            scale: .78,
            duration: .25,
            force3D: true,
          }, at)
          .to(receiver, {
            scale: receiverScale,
            duration: .3,
            force3D: true,
          }, at)
          .to([mask, outline, fill], { attr: { r: 0 }, duration: .1 }, at + .23)
      })

      handoff
        .to(finalCircle, {
          y: () => getFinalGeometry().finalY - getSourceY(finalCircle),
          duration: .3,
          force3D: true,
        // Move the newly enlarged final circle upward as its last merge
        // happens—never after it has grown into the mission reading area.
        }, .66)
        .to(finalMask, { attr: { r: ringRadius }, duration: .22 }, .78)

      return () => {
        handoff.kill()
        gsap.set([target, ...sources, mission], { clearProps: 'transform' })
        gsap.set(finalMask, { attr: { r: 0 } })
        ;[target, ...sources].forEach((source) => {
          const mask = getMask(source)
          const outline = source.querySelector('[data-mobile-merge-ring-outline]')
          const fill = source.querySelector('[data-mobile-merge-fill]')
          if (mask && outline && fill) gsap.set([mask, outline, fill], { attr: { r: ringRadius } })
        })
      }
    })

    return () => media.revert()
  }, [isPreloaderDone, usesMobileMerge])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    // Compact landscape tablets use the mobile Impact handoff below. Keep the
    // desktop film reveal out of that range so both timelines never compete
    // for the same circle and play control.
    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (min-height: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const impact = scope.querySelector('.impact')
      const feature = scope.querySelector('.impact-visual--feature')
      const featureImage = feature?.querySelector('img')
      const featureRing = feature?.querySelector('.impact-visual__ring')
      const play = feature?.querySelector('.impact-visual__play')
      const supportingVisuals = scope.querySelectorAll('.impact-visual--before, .impact-visual--after')
      const supportingLabels = scope.querySelectorAll('.impact-label')
      const content = scope.querySelectorAll('.impact-overview, .impact-story, .impact-cta, .impact-tagline')

      // Large tablets use a shorter Work canvas than desktop. On a tall
      // portrait screen, the generic Impact trigger would consequently begin
      // while the hero-to-Work handoff was still in progress. Give each large
      // tablet orientation its own natural scroll window: Work resolves
      // first, then the incoming film circle starts opening as it reaches the
      // reading area. Desktop keeps its established timing exactly.
      const isLargeTabletPortrait = window.matchMedia(
        '(min-width: 861px) and (max-width: 1100px) and (min-height: 901px) and (orientation: portrait)'
      ).matches
      const isLargeTabletLandscape = window.matchMedia(
        '(min-width: 1200px) and (max-width: 1450px) and (min-height: 760px) and (max-height: 1100px) and (orientation: landscape)'
      ).matches
      const impactStart = isLargeTabletPortrait
        ? 'top 65%'
        : isLargeTabletLandscape
          ? 'top 78%'
          : 'top 92%'
      const impactEnd = (isLargeTabletPortrait || isLargeTabletLandscape) ? 'top 12%' : 'top 10%'

      if (!impact || !feature || !featureImage || !featureRing || !play) return undefined

      const revealMask = 'inset(0% 0% 0% 0%)'
      const hiddenFromTop = 'inset(100% 0% 0% 0%)'
      const hiddenFromBottom = 'inset(0% 0% 100% 0%)'

      gsap.set(feature, {
        clipPath: hiddenFromTop,
        y: () => Math.min(148, window.innerWidth * .07),
      })
      gsap.set(featureImage, { scale: 1.08, transformOrigin: '50% 50%' })
      gsap.set(featureRing, { scale: .94, transformOrigin: '50% 50%' })
      gsap.set(play, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(supportingVisuals, {
        clipPath: hiddenFromBottom,
        y: () => Math.min(72, window.innerWidth * .035),
      })
      gsap.set(supportingLabels, {
        clipPath: hiddenFromBottom,
        y: () => Math.min(30, window.innerWidth * .014),
      })
      gsap.set(content, {
        clipPath: hiddenFromBottom,
        y: () => Math.min(42, window.innerWidth * .02),
      })

      const handoff = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: impact,
          start: impactStart,
          end: impactEnd,
          scrub: .7,
          invalidateOnRefresh: true,
        },
      })

      handoff
        .to(feature, { clipPath: revealMask, y: 0, duration: .58 }, 0)
        .to(featureImage, { scale: 1, duration: .58 }, 0)
        .to(featureRing, { scale: 1, duration: .5 }, .05)
        .to(play, { scale: 1, duration: .18 }, .4)
        .to(supportingVisuals, { clipPath: revealMask, y: 0, duration: .25, stagger: .06 }, .56)
        .to(supportingLabels, { clipPath: revealMask, y: 0, duration: .18, stagger: .05 }, .66)
        .to(content, { clipPath: revealMask, y: 0, duration: .28, stagger: .045 }, .74)

      return () => handoff.kill()
    })

    return () => media.revert()
  }, [isPreloaderDone])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(max-width: 860px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (max-width: 1100px) and (max-height: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const overview = pageRef.current.querySelector('.impact-overview')
      const statistics = overview?.querySelectorAll('strong')

      if (!overview || !statistics?.length) return undefined

      const reveal = gsap.fromTo(statistics, {
        '--impact-stat-paint': '0%',
      }, {
        '--impact-stat-paint': '100%',
        duration: 1,
        ease: 'none',
        stagger: .16,
        scrollTrigger: {
          trigger: overview,
          // Begin only once the whole Impact brief is in a natural reading
          // zone, rather than while the film circle is still taking focus.
          start: 'top 72%',
          end: 'top 48%',
          scrub: .45,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        reveal.kill()
        gsap.set(statistics, { clearProps: '--impact-stat-paint' })
      }
    })

    return () => media.revert()
  }, [isPreloaderDone])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(max-width: 860px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (max-width: 1100px) and (max-height: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const source = scope.querySelector('.work-mobile-outro__button')
      const sourceContent = scope.querySelectorAll('.work-mobile-outro__label, .work-mobile-outro__arrow')
      const sourceShape = scope.querySelector('[data-mobile-explore-morph]')
      const impact = scope.querySelector('.impact')
      const feature = scope.querySelector('.impact-visual--feature')
      const play = feature?.querySelector('.impact-visual__play')

      if (!source || !sourceShape || !impact || !feature || !play) return undefined

      // Both controls live in normal flow. Their document-coordinate delta is
      // stable while scrolling, so the CTA can travel into the centre of the
      // incoming film without pinning or a fixed overlay.
      const handoffVector = () => {
        const sourceBox = source.getBoundingClientRect()
        const playBox = play.getBoundingClientRect()
        return {
          x: playBox.left + playBox.width / 2 - (sourceBox.left + sourceBox.width / 2),
          y: playBox.top + playBox.height / 2 - (sourceBox.top + sourceBox.height / 2),
        }
      }

      gsap.set(feature, { clipPath: 'circle(0% at 50% 50%)' })
      gsap.set(play, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(source, { transformOrigin: '50% 50%', willChange: 'transform' })
      gsap.set(sourceContent, { transformOrigin: '50% 50%' })
      const shape = { progress: 0 }

      const handoff = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: impact,
          start: 'top 94%',
          end: 'top 42%',
          scrub: .5,
          invalidateOnRefresh: true,
        },
      })

      handoff
        .to(feature, { clipPath: 'circle(75% at 50% 50%)', duration: .68 }, 0)
        .to(source, {
          x: () => handoffVector().x,
          y: () => handoffVector().y,
          // Keep the recognisable Explore pill intact while it travels. Its
          // physical change happens only once it has reached the play centre.
          duration: .56,
          force3D: true,
        }, .12)
        // Let the CTA finish its journey before changing shape. Starting the
        // non-uniform scale even a frame early makes the tablet version look
        // as if it pulls to one side rather than resolving into a circle.
        .to(sourceContent, { clipPath: 'inset(0% 50% 0% 50%)', duration: .12 }, .68)
        .to(source, {
          // Resolve from the measured controls rather than fixed dimensions.
          // This keeps the pill-to-play morph perfectly registered when the
          // same mobile composition scales up for tablets.
          scaleX: () => play.offsetWidth / source.offsetWidth,
          scaleY: () => play.offsetHeight / source.offsetHeight,
          duration: .22,
          force3D: true,
        }, .68)
        .to(shape, {
          progress: 1,
          duration: .22,
          onUpdate: () => sourceShape.setAttribute('d', mobileExploreMorphPath(shape.progress)),
        }, .68)
        // At the exact final circle state, swap in the real video control on
        // the same centre and dimensions. The green surface never fades or
        // drifts; it simply gains its play mark once its CTA text has folded
        // away, which keeps the handoff clear under scroll scrubbing.
        .set(play, { scale: 1 }, .9)
        .set(source, { visibility: 'hidden' }, .9)

      return () => {
        handoff.kill()
        gsap.set([feature, play, source, ...sourceContent], { clearProps: 'clipPath,transform,borderRadius,visibility,willChange' })
        sourceShape.setAttribute('d', mobileExploreMorphPath())
      }
    })

    return () => media.revert()
  }, [isPreloaderDone])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(max-width: 860px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (max-width: 1100px) and (max-height: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const section = scope.querySelector('.get-involved')
      const backdrop = scope.querySelector('.get-involved__backdrop')
      const intro = scope.querySelector('.get-involved__intro')
      const cards = Array.from(scope.querySelectorAll('.involvement-card'))
      const cta = scope.querySelector('.get-involved__cta')
      const usesHorizontalCapsule = window.matchMedia('(min-width: 861px) and (max-width: 1100px) and (max-height: 900px) and (orientation: landscape)').matches

      if (!section || !backdrop || !intro || cards.length !== 4 || !cta) return undefined

      const capsuleClip = () => {
        const backdropBox = backdrop.getBoundingClientRect()
        const boxes = cards.map((card) => card.getBoundingClientRect())
        const top = Math.min(...boxes.map((box) => box.top))
        const right = Math.max(...boxes.map((box) => box.right))
        const bottom = Math.max(...boxes.map((box) => box.bottom))
        const left = Math.min(...boxes.map((box) => box.left))
        const gutter = Math.max(12, boxes[0].width * .075)
        const toPercent = (value, size) => Math.max(0, Math.min(100, value / size * 100))

        const rounding = usesHorizontalCapsule ? '999px' : '52px'
        return `inset(${toPercent(top - backdropBox.top - gutter, backdropBox.height)}% ${toPercent(backdropBox.right - right - gutter, backdropBox.width)}% ${toPercent(backdropBox.bottom - bottom - gutter, backdropBox.height)}% ${toPercent(left - backdropBox.left - gutter, backdropBox.width)}% round ${rounding})`
      }

      gsap.set(backdrop, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(intro, { clipPath: 'inset(0% 0% 100% 0%)', y: 22 })
      gsap.set(cards, { clipPath: 'circle(0% at 50% 50%)', transformOrigin: '50% 50%' })
      gsap.set(cta, { clipPath: 'inset(0% 50% 0% 50% round 999px)' })

      const handoff = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'top 22%',
          scrub: .7,
          invalidateOnRefresh: true,
        },
      })

      handoff
        .to(backdrop, { clipPath: capsuleClip, duration: .56 }, 0)
        .to(intro, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .26 }, .14)
        .to(cards, { clipPath: 'circle(75% at 50% 50%)', duration: .34, stagger: .07 }, .32)
        .to(cta, { clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: .2 }, .7)

      return () => handoff.kill()
    })

    return () => media.revert()
  }, [isPreloaderDone])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (min-height: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const section = scope.querySelector('.get-involved')
      const backdrop = scope.querySelector('.get-involved__backdrop')
      const intro = scope.querySelector('.get-involved__intro')
      const cards = scope.querySelectorAll('.involvement-card')
      const cta = scope.querySelector('.get-involved__cta')

      if (!section || !backdrop || !intro || cards.length !== 4 || !cta) return undefined

      /* The navy field starts full-bleed, then closes evenly around the
         centred service row from every edge—like the Work rail resolving out
         of the page rather than a separate panel appearing. */
      gsap.set(backdrop, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(intro, { clipPath: 'inset(0% 0% 100% 0%)', y: 28 })
      gsap.set(cards, {
        clipPath: 'circle(0% at 50% 50%)',
        transformOrigin: '50% 50%',
      })
      gsap.set(cta, { clipPath: 'inset(0% 50% 0% 50% round 999px)' })

      /* The backdrop is deliberately viewport-wide while the row scales from
         the height-aware section canvas. Measure the cards instead of using
         a fixed percentage so the final pill hugs both outer circles at every
         desktop aspect ratio. */
      const capsuleClip = () => {
        const backdropBox = backdrop.getBoundingClientRect()
        const cardBoxes = Array.from(cards, (card) => card.getBoundingClientRect())
        const first = cardBoxes[0]
        const last = cardBoxes[cardBoxes.length - 1]
        const cardTop = Math.min(...cardBoxes.map((box) => box.top))
        const cardBottom = Math.max(...cardBoxes.map((box) => box.bottom))
        const gutter = first.width * .1
        const toPercent = (value, size) => Math.max(0, Math.min(100, (value / size) * 100))

        const top = toPercent(cardTop - backdropBox.top - gutter, backdropBox.height)
        const right = toPercent(backdropBox.right - last.right - gutter, backdropBox.width)
        const bottom = toPercent(backdropBox.bottom - cardBottom - gutter, backdropBox.height)
        const left = toPercent(first.left - backdropBox.left - gutter, backdropBox.width)

        return `inset(${top}% ${right}% ${bottom}% ${left}% round 999px)`
      }

      const handoff = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          end: 'top 14%',
          scrub: .7,
          invalidateOnRefresh: true,
        },
      })

      handoff
        .to(backdrop, { clipPath: capsuleClip, duration: .56 }, 0)
        .to(intro, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .3 }, .16)
        .to(cards, { clipPath: 'circle(75% at 50% 50%)', duration: .32, stagger: .055 }, .38)
        .to(cta, { clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: .22 }, .7)

      return () => handoff.kill()
    })

    return () => media.revert()
  }, [isPreloaderDone])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    // Compact landscape tablets use the mobile service list too, so they
    // must not initialise the desktop hero-to-grid handoff layer.
    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (min-height: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const heroRings = Array.from(scope.querySelectorAll('.story-image'))
      const workSection = scope.querySelector('.what-we-do')
      const workGrid = scope.querySelector('.work-top-grid')
      const workCards = Array.from(scope.querySelectorAll('.work-top-grid .work-card'))
      const workRail = scope.querySelector('.work-rail')
      const workIntro = scope.querySelector('.work-intro')
      const lowerCards = scope.querySelector('.work-lower-cards')
      const workSummary = scope.querySelector('.work-summary')
      // The large iPad layouts deliberately give source and destination rings
      // identical horizontal centres. Moving them with the desktop stagger
      // would still make a straight rail look skewed mid-scrub, so those two
      // tablet orientations travel and resolve as one composed system.
      const usesAlignedTabletHandoff = window.matchMedia(
        '(min-width: 861px) and (max-width: 1100px) and (min-height: 901px) and (orientation: portrait), ' +
        '(min-width: 1200px) and (max-width: 1450px) and (min-height: 760px) and (max-height: 1100px) and (orientation: landscape), ' +
        '(min-width: 1800px) and (min-height: 1000px) and (orientation: landscape)'
      ).matches
      const ringStagger = usesAlignedTabletHandoff ? 0 : .025
      const cardStagger = usesAlignedTabletHandoff ? 0 : .04

      if (heroRings.length !== 4 || workCards.length !== 4 || !workSection || !workGrid || !workRail || !workIntro || !lowerCards || !workSummary) return undefined

      const layer = document.createElement('div')
      layer.className = 'hero-work-handoff'
      // A browser may restore the previous scroll position before the
      // preloader completes. Keep this fixed layer invisible until its
      // ScrollTrigger has established whether that position is still within
      // the hero-to-Work handoff.
      layer.style.visibility = 'hidden'
      // The preloader has already allowed the source rings to settle. Take
      // ownership synchronously before the first exposed homepage frame, so
      // immediate scrolling always controls full-size travelling rings.
      const travellingRings = heroRings.map((ring, index) => {
        const travellingRing = document.createElement('div')
        const ringStyle = window.getComputedStyle(ring)
        travellingRing.className = `hero-work-handoff__ring hero-work-handoff__ring--${index + 1}`
        travellingRing.style.backgroundImage = ringStyle.backgroundImage
        travellingRing.style.backgroundPosition = ringStyle.backgroundPosition
        layer.appendChild(travellingRing)
        return travellingRing
      })
      document.body.appendChild(layer)

      let handoff
      const setRingOwner = (useHandoffLayer) => {
        layer.style.visibility = useHandoffLayer ? 'visible' : 'hidden'
        heroRings.forEach((ring) => {
          ring.style.visibility = useHandoffLayer ? 'hidden' : ''
        })
      }
      const rectAtScroll = (element, scrollPosition) => {
        const rect = element.getBoundingClientRect()
        const offset = window.scrollY - scrollPosition
        return {
          // Use the on-screen hero size exactly as the visitor sees it. This
          // size remains fixed for the complete hero-to-work handoff.
          left: rect.left,
          top: rect.top + offset,
          width: rect.width,
          height: rect.height,
        }
      }
      const startRect = (index) => rectAtScroll(heroRings[index], handoff.scrollTrigger.start)
      const endRect = (index) => rectAtScroll(workCards[index], handoff.scrollTrigger.end)
      const endPosition = (index) => {
        const start = startRect(index)
        const end = endRect(index)

        // The ring travels to the centre of its service card without changing
        // diameter. The larger card is then revealed beneath it by clipping.
        return {
          left: end.left + ((end.width - start.width) / 2),
          top: end.top + ((end.height - start.height) / 2),
        }
      }
      const parkRingsAtRest = () => {
        gsap.set(travellingRings, {
          x: (index) => startRect(index).left,
          y: (index) => startRect(index).top,
          width: (index) => startRect(index).width,
          height: (index) => startRect(index).height,
          clipPath: 'circle(50% at 50% 50%)',
        })
      }
      const syncRingOwner = (trigger) => {
        if (!trigger) return

        // After the morph, the real Work cards own the visual. Leaving the
        // fixed photographic layer visible is what made hero rings appear on
        // a restored scroll position in later sections.
        if (trigger.progress >= .999) {
          setRingOwner(false)
          return
        }

        // Before the handoff begins the travelling layer exactly overlays the
        // hero rings; during the scrub it remains the sole visual owner.
        if (trigger.progress <= .001) parkRingsAtRest()
        setRingOwner(true)
      }
      gsap.set(workGrid, { clipPath: 'inset(0% 100% 0% 0%)' })
      gsap.set(workCards, {
        clipPath: 'circle(0% at 50% 50%)',
        transformOrigin: '50% 50%',
      })
      gsap.set(workRail, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set(workIntro, { clipPath: 'inset(0% 100% 0% 0%)', x: -28 })
      gsap.set(lowerCards, { clipPath: 'inset(0% 0% 100% 0%)', y: 34 })
      gsap.set(workSummary, { clipPath: 'inset(0% 0% 100% 0%)', y: 24 })

      handoff = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: workSection,
          // Begin at the first scroll beat, retaining the immediate Hero-to-
          // Work handoff used by the earlier desktop interaction.
          start: 'top bottom',
          end: 'top 8%',
          scrub: .7,
          invalidateOnRefresh: true,
          onUpdate: syncRingOwner,
          onRefresh: syncRingOwner,
        },
      })

      handoff
        .fromTo(travellingRings, {
          x: (index) => startRect(index).left,
          y: (index) => startRect(index).top,
          width: (index) => startRect(index).width,
          height: (index) => startRect(index).height,
          clipPath: 'circle(50% at 50% 50%)',
        }, {
          x: (index) => endPosition(index).left,
          y: (index) => endPosition(index).top,
          force3D: true,
          duration: .66,
          stagger: ringStagger,
        }, 0)
        .to(workGrid, { clipPath: 'inset(0% 0% 0% 0%)', duration: .48 }, .14)
        .to(workIntro, { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: .32 }, .32)
        .to(workCards, { clipPath: 'circle(75% at 50% 50%)', duration: .24, stagger: cardStagger }, .57)
        .to(travellingRings, { clipPath: 'circle(0% at 50% 50%)', duration: .14, stagger: ringStagger }, .66)
        .to(workRail, { clipPath: 'inset(0% 0% 0% 0%)', duration: .32 }, .68)
        .to(lowerCards, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .26 }, .78)
        .to(workSummary, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .22 }, .86)

      // Install the scrub path before the hero can be touched, then choose
      // its owner from the current scroll position. This also handles native
      // browser scroll restoration after a refresh in a later section.
      ScrollTrigger.refresh()
      syncRingOwner(handoff.scrollTrigger)

      return () => {
        handoff.kill()
        layer.remove()
        gsap.set([
          ...heroRings,
          workGrid,
          ...workCards,
          workRail,
          workIntro,
          lowerCards,
          workSummary,
        ], { clearProps: 'clipPath,transform,visibility' })
      }
    })

    return () => media.revert()
  }, [isPreloaderDone])

  useLayoutEffect(() => {
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(max-width: 860px) and (prefers-reduced-motion: no-preference), (min-width: 861px) and (max-width: 1100px) and (max-height: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const services = Array.from(scope.querySelectorAll('.work-mobile-service'))

      if (services.length !== 6) return undefined

      const animations = services.map((service) => {
        const circle = service.querySelector('.work-mobile-service__circle')
        const copy = service.querySelector('p')
        if (!circle || !copy) return null

        // Normal document scroll: a service opens from its knot as its row
        // enters, then remains open with its revealed copy. On a reverse
        // scroll the same timeline naturally contracts it back to a knot.
        gsap.set(circle, { scale: .18, transformOrigin: '50% 50%', force3D: true })
        gsap.set(copy, {
          x: 14,
          clipPath: 'inset(0% 100% 0% 0%)',
          force3D: true,
        })

        return gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: service,
            // The interaction happens around the reading area rather than
            // at the bottom of the viewport. Every completed service remains
            // visually available, creating a calm, cumulative reading path.
            start: 'top 76%',
            end: 'top 57%',
            scrub: .4,
            invalidateOnRefresh: true,
          },
        })
          .to(circle, { scale: 1, duration: .24 }, 0)
          .to(copy, { x: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: .24 }, .04)
      }).filter(Boolean)

      return () => {
        animations.forEach((animation) => animation.kill())
        services.forEach((service) => {
          const circle = service.querySelector('.work-mobile-service__circle')
          const copy = service.querySelector('p')
          gsap.set([circle, copy], { clearProps: 'transform,clipPath' })
        })
      }
    })

    return () => media.revert()
  }, [isPreloaderDone])

  return (
    <>
      {!isPreloaderDone && (
        <Preloader
          isLeaving={isLeaving}
          progress={progress}
          onExitComplete={completePreloader}
        />
      )}
      <main ref={pageRef} id="top" className={`page-shell${isHeroReady ? ' hero-is-ready' : ''}${isRingsReady ? ' rings-are-ready' : ''}`} style={{ '--reference-image': `url(${referenceImage})` }}>
        <section className={`hero${usesMobileMerge ? ' hero--mobile-merge' : ''}`} aria-labelledby="hero-heading">
        <div className="mobile-hero-header">
          <Brand />
          <MobileNav />
        </div>

        <DesktopNav />

        <HeroFeature />

        <div className="intro">
          <h1 id="hero-heading">
            <span>We are working toward a just, resilient,</span><br />
            <span>and waste-free world where low-income communities</span><br />
            <span>build with dignity using reclaimed resources.</span>
          </h1>
        </div>

        {usesMobileMerge && <MobileHeroMerge />}

        <div className="story-images" aria-label="Stories from PISDK communities">
          <StoryImage className="damaged" image={storyDamagedHome} label="A damaged home in need of rebuilding" />
          <StoryImage className="materials" image={storyReclaimedScrap} label="Reclaimed corrugated construction materials" />
          <StoryImage className="rebuilt" image={storyRebuiltHome} label="A rebuilt home made from reclaimed materials" />
          <StoryImage className="children" image={storyCommunityChildren} label="Children in a local community" />
        </div>

        <section className="mission" aria-label="About PISDK">
          <span className="mission-rule" />
          <div>
            <p>At the Paragon Institute of Sustainable Development Kenya (PISDK), we advance circular economy solutions in construction and waste management. Our mission is to prove that sustainability equals affordability.</p>
            <p>We do this by deconstructing buildings instead of demolishing them, recovering valuable materials, and channeling them back into community housing and infrastructure at prices co-created with the people we serve.</p>
          </div>
        </section>

        <div className="tagline" aria-label="People, materials, communities, circular construction">
          People <b>/</b> Materials <b>/</b> Communities <b>/</b> Circular construction
        </div>
        </section>
        <WhatWeDo />
        <Impact />
        <GetInvolved />
        <SiteFooter />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
