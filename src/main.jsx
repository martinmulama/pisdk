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
import nairobiWasteHousing from './assets/nairobi-waste-housing.png'
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
    copy: <>Doors, windows, timber,<br />steel, and masonry—<br />channelled into community<br />housing.</>,
    icon: workRecoveryIcon,
  },
  {
    id: 'partner',
    title: 'Partner With Us',
    copy: <>CSR partnerships,<br />element sponsorship,<br />fiscal sponsorship.</>,
    icon: getInvolvedPartnerIcon,
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    copy: <>Join us in Kibera—<br />volunteers, researchers,<br />and interns welcome.</>,
    icon: workCommunityIcon,
  },
  {
    id: 'visit',
    title: 'Visit Our Projects',
    copy: <>See our work firsthand,<br />site visits available.</>,
    icon: getInvolvedVisitIcon,
  },
]

function StoryImage({ className, label, image }) {
  return <div className={`story-image ${className}`} role="img" aria-label={label} style={{ '--story-image': `url(${image})` }} />
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

function WhatWeDo() {
  return (
    <section className="what-we-do" id="our-work" aria-labelledby="work-heading">
      <div className="work-intro">
        <h2 id="work-heading">What We Do: A Complete<br />Circular Ecosystem.</h2>
        <a className="work-intro__button" href="#current-pilots">Explore our work <span aria-hidden="true">→</span></a>
      </div>

      <div className="work-rail" aria-hidden="true" />
      <div className="work-top-grid">
        {workServices.slice(0, 4).map((service) => <WorkCard key={service.id} service={service} />)}
      </div>
      <div className="work-lower-cards">
        {workServices.slice(4).map((service) => <WorkCard key={service.id} service={service} />)}
      </div>

      <p className="work-summary">We work across the entire circular ecosystem—<br />connecting people, resources and knowledge<br />to create lasting change in Kenya’s communities.</p>
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

function Preloader({ isLeaving, progress, heroTarget, onExitComplete }) {
  const mediaRef = useRef(null)
  const darkFieldRef = useRef(null)
  const leftCopyRef = useRef(null)
  const rightCopyRef = useRef(null)
  const mediaImageRef = useRef(null)

  useLayoutEffect(() => {
    if (!isLeaving || !heroTarget || !mediaRef.current) return undefined

    const media = mediaRef.current
    const darkField = darkFieldRef.current
    const leftCopy = leftCopyRef.current
    const rightCopy = rightCopyRef.current
    const mediaBounds = media.getBoundingClientRect()
    const leftBounds = leftCopy.getBoundingClientRect()
    const rightBounds = rightCopy.getBoundingClientRect()
    const translateX = heroTarget.left - (mediaBounds.left + mediaBounds.width / 2) + heroTarget.width / 2
    const translateY = heroTarget.top - (mediaBounds.top + mediaBounds.height / 2) + heroTarget.height / 2
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fieldDuration = reducedMotion ? 0.08 : 0.58
    const mediaDelay = reducedMotion ? 0 : fieldDuration + 0.06
    const duration = reducedMotion ? 0.08 : 1.08
    const shapeDuration = reducedMotion ? 0.08 : 0.56
    const ease = reducedMotion ? 'none' : 'power3.inOut'

    gsap.set(media, { clipPath: 'inset(0)' })

    let handoffFrame
    const exit = gsap.timeline({
      defaults: { duration, ease },
      onComplete: () => {
        // Snap to the measured hero bounds before the image source changes.
        // This keeps the moving element itself continuous with the real hero.
        gsap.set(media, {
          width: heroTarget.width,
          height: heroTarget.height,
          borderRadius: 0,
        })
        const landedBounds = media.getBoundingClientRect()
        media.style.setProperty('--preloader-x', `${translateX + heroTarget.left - landedBounds.left}px`)
        media.style.setProperty('--preloader-y', `${translateY + heroTarget.top - landedBounds.top}px`)
        handoffFrame = requestAnimationFrame(() => {
          handoffFrame = requestAnimationFrame(onExitComplete)
        })
      },
    })

    exit
      .to(darkField, { x: -window.innerWidth - darkField.getBoundingClientRect().right, duration: fieldDuration, ease: 'power2.in' }, 0)
      .to(leftCopy, { x: -leftBounds.right - 64, duration: fieldDuration, ease: 'power2.in' }, 0)
      .to(rightCopy, { x: window.innerWidth - rightBounds.left + 64, duration: fieldDuration, ease: 'power2.in' }, 0)
      // The image changes from the problem statement to the homepage story as
      // its journey begins. Its landing is therefore the same artwork as hero.
      .call(() => {
        media.classList.add('preloader-media--hero')
        mediaImageRef.current.src = heroFeature
      }, [], mediaDelay)
      .to(media, {
        '--preloader-x': `${translateX}px`,
        '--preloader-y': `${translateY}px`,
      }, mediaDelay)
      // Form the hero oval early. The final section is only a rigid slide,
      // so its silhouette does not swell as it lands on the hero image.
      .to(media, {
        width: heroTarget.width,
        height: heroTarget.height,
        borderRadius: 0,
        duration: shapeDuration,
        ease: reducedMotion ? 'none' : 'power2.inOut',
      }, mediaDelay)

    return () => {
      exit.kill()
      cancelAnimationFrame(handoffFrame)
    }
  }, [heroTarget, isLeaving, onExitComplete])

  return (
    <section
      className={`preloader${isLeaving ? ' preloader--leaving' : ''}`}
      aria-label="Loading PISDK"
      aria-live="polite"
    >
      <div className="preloader-dark-field" ref={darkFieldRef} />

      <div className="preloader-left-copy" ref={leftCopyRef}>
        <p className={`preloader-stat preloader-stat--waste preloader-stat--reveal-left${progress >= 14 ? ' is-revealed' : ''}`}>Nairobi generates<br />over 2,400 tonnes<br />of waste every day.</p>
        <p className={`preloader-stat preloader-stat--recycled preloader-stat--reveal-left${progress >= 30 ? ' is-revealed' : ''}`}>Less than 5%<br />of C&amp;D waste<br />is recycled.</p>
      </div>

      <div
        className="preloader-media"
        ref={mediaRef}
        role="progressbar"
        aria-label="Loading the PISDK homepage"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progress)}
        style={{ '--loader-angle': `${progress * 3.6}deg` }}
      >
        <img ref={mediaImageRef} src={nairobiWasteHousing} alt="Nairobi skyline and construction waste" />
        <svg className="preloader-hero-outline" viewBox="0 0 429 650" focusable="false" aria-hidden="true">
          <circle cx="97.2" cy="330.5" r="329" />
        </svg>
      </div>

      <div className="preloader-right-copy" ref={rightCopyRef}>
        <p className={`preloader-stat preloader-stat--housing preloader-stat--reveal-right${progress >= 48 ? ' is-revealed' : ''}`}><strong>Over 60%</strong><span>of the population live in<br />informal settlements.</span></p>
        <p className={`preloader-stat preloader-stat--deficit preloader-stat--reveal-right${progress >= 64 ? ' is-revealed' : ''}`}>A 2m unit<br />housing deficit.</p>
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
  const [heroTarget, setHeroTarget] = useState(null)
  const pageRef = useRef(null)

  const completePreloader = useCallback(() => setIsPreloaderDone(true), [])

  useEffect(() => {
    if (!isPreloaderDone) return undefined
    const revealFrame = requestAnimationFrame(() => setIsHeroReady(true))
    return () => cancelAnimationFrame(revealFrame)
  }, [isPreloaderDone])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // This is a problem statement, not a flash screen: give visitors time to read it.
    const duration = reducedMotion ? 80 : 6500
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
        const featureImage = document.querySelector('.feature-image')
        if (featureImage) {
          const { left, top, width, height } = featureImage.getBoundingClientRect()
          setHeroTarget({
            left,
            top,
            width,
            height,
          })
        }
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
    if (!isPreloaderDone || !pageRef.current) return undefined

    const media = gsap.matchMedia()

    media.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const impact = scope.querySelector('.impact')
      const feature = scope.querySelector('.impact-visual--feature')
      const featureImage = feature?.querySelector('img')
      const featureRing = feature?.querySelector('.impact-visual__ring')
      const play = feature?.querySelector('.impact-visual__play')
      const supportingVisuals = scope.querySelectorAll('.impact-visual--before, .impact-visual--after')
      const supportingLabels = scope.querySelectorAll('.impact-label')
      const content = scope.querySelectorAll('.impact-overview, .impact-story, .impact-cta, .impact-tagline')

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
          start: 'top 92%',
          end: 'top 10%',
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

    media.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
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

    media.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current
      const heroRings = Array.from(scope.querySelectorAll('.story-image'))
      const workSection = scope.querySelector('.what-we-do')
      const workGrid = scope.querySelector('.work-top-grid')
      const workCards = Array.from(scope.querySelectorAll('.work-top-grid .work-card'))
      const workRail = scope.querySelector('.work-rail')
      const workIntro = scope.querySelector('.work-intro')
      const lowerCards = scope.querySelector('.work-lower-cards')
      const workSummary = scope.querySelector('.work-summary')

      if (heroRings.length !== 4 || workCards.length !== 4 || !workSection || !workGrid || !workRail || !workIntro || !lowerCards || !workSummary) return undefined

      const layer = document.createElement('div')
      layer.className = 'hero-work-handoff'
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
          start: 'top bottom',
          end: 'top 8%',
          scrub: .7,
          invalidateOnRefresh: true,
          onRefresh: (trigger) => {
            // Preserve exact resting geometry through an early resize or
            // refresh, before the scroll-scrubbed path begins.
            if (handoff && trigger.progress <= .001) parkRingsAtRest()
          },
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
          stagger: .025,
        }, 0)
        .to(workGrid, { clipPath: 'inset(0% 0% 0% 0%)', duration: .48 }, .14)
        .to(workIntro, { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: .32 }, .32)
        .to(workCards, { clipPath: 'circle(75% at 50% 50%)', duration: .24, stagger: .04 }, .57)
        .to(travellingRings, { clipPath: 'circle(0% at 50% 50%)', duration: .14, stagger: .025 }, .66)
        .to(workRail, { clipPath: 'inset(0% 0% 0% 0%)', duration: .32 }, .68)
        .to(lowerCards, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .26 }, .78)
        .to(workSummary, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .22 }, .86)

      // Install the scrub path before the hero can be touched. The layer and
      // its source rings already occupy the same final-size pixels here.
      ScrollTrigger.refresh()
      parkRingsAtRest()
      setRingOwner(true)

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

  return (
    <>
      {!isPreloaderDone && (
        <Preloader
          isLeaving={isLeaving}
          progress={progress}
          heroTarget={heroTarget}
          onExitComplete={completePreloader}
        />
      )}
      <main ref={pageRef} id="top" className={`page-shell${isHeroReady ? ' hero-is-ready' : ''}${isRingsReady ? ' rings-are-ready' : ''}`} style={{ '--reference-image': `url(${referenceImage})` }}>
        <section className="hero" aria-labelledby="hero-heading">
        <Brand />

        <DesktopNav />

        <HeroFeature />

        <div className="intro">
          <h1 id="hero-heading">We are working toward a just, resilient,<br />{'and waste-free world where low-income communities'}<br />{'build with dignity using reclaimed resources.'}</h1>
        </div>

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
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
