import { createRoot } from 'react-dom/client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
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
import impactReference from './assets/pisdk-impact-reference.png'

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

function ReferenceCrop({ className, label = '' }) {
  return <div className={`reference-crop ${className}`} role="img" aria-label={label} />
}

function StoryImage({ className, label, image }) {
  return <div className={`story-image ${className}`} role="img" aria-label={label} style={{ '--story-image': `url(${image})` }} />
}

function Brand() {
  return <a className="brand" href="#top" aria-label="PISDK — Paragon Institute of Sustainable Development Kenya" />
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
      <ReferenceCrop className="work-section-leaf" label="" />
    </section>
  )
}

function ImpactVisual({ className, label }) {
  return (
    <div
      className={`impact-visual ${className}`}
      role="img"
      aria-label={label}
      style={{ '--impact-reference': `url(${impactReference})` }}
    />
  )
}

function Impact() {
  return (
    <section className="impact" id="current-pilots" aria-labelledby="impact-heading">
      <ImpactVisual className="impact-visual--before" label="A damaged Foundation of Hope building before the rebuild" />
      <ImpactVisual className="impact-visual--feature" label="A PISDK craftsperson rebuilding the Foundation of Hope Youth Centre" />
      <ImpactVisual className="impact-visual--after" label="The rebuilt Foundation of Hope Youth Centre" />

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
      <ReferenceCrop className="leaf impact-section-leaf" label="" />
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
  const [heroTarget, setHeroTarget] = useState(null)

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
        setIsLeaving(true)
      }, reducedMotion ? 0 : 150)
    }

    frame = requestAnimationFrame(updateProgress)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(exitTimer)
    }
  }, [])

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
      <main id="top" className={`page-shell${isHeroReady ? ' hero-is-ready' : ''}`} style={{ '--reference-image': `url(${referenceImage})` }}>
        <section className="hero" aria-labelledby="hero-heading">
        <Brand />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {menu.map((item, index) => <a className={index === 0 ? 'active' : ''} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>)}
        </nav>

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

          <ReferenceCrop className="leaf" label="" />
        </section>
        <WhatWeDo />
        <Impact />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
