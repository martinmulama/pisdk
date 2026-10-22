import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_VIDEO_URL = 'https://player.vimeo.com/video/1091366405?autoplay=1'
const DEFAULT_FALLBACK_URL = 'https://vimeo.com/1091366405'
const VIMEO_API_URL = 'https://player.vimeo.com/api/player.js'

let vimeoApiPromise

function loadVimeoPlayerApi() {
  if (window.Vimeo?.Player) return Promise.resolve(window.Vimeo.Player)
  if (!vimeoApiPromise) {
    vimeoApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = VIMEO_API_URL
      script.async = true
      script.dataset.vimeoPlayerApi = 'true'
      script.onload = () => window.Vimeo?.Player
        ? resolve(window.Vimeo.Player)
        : reject(new Error('Vimeo Player API did not initialize'))
      script.onerror = () => reject(new Error('Vimeo Player API failed to load'))
      document.head.append(script)
    })
  }
  return vimeoApiPromise
}

export default function VideoModal({
  onClose,
  videoUrl = DEFAULT_VIDEO_URL,
  fallbackUrl = DEFAULT_FALLBACK_URL,
}) {
  const dialogRef = useRef(null)
  const iframeRef = useRef(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog?.querySelector('.video-modal__close')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialog) return

      const focusable = [...dialog.querySelectorAll('button:not([disabled]), iframe, a[href], [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }
    const keepFocusInDialog = (event) => {
      if (!dialog?.contains(event.target)) dialog?.querySelector('.video-modal__close')?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', keepFocusInDialog)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', keepFocusInDialog)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  useEffect(() => {
    const iframe = iframeRef.current
    let cancelled = false
    let player
    const showFallback = () => { if (!cancelled) setHasError(true) }
    const fallbackTimer = window.setTimeout(showFallback, 15000)

    loadVimeoPlayerApi()
      .then((Player) => {
        if (cancelled || !iframe) return null
        player = new Player(iframe)
        player.on('error', showFallback)
        player.on('playing', () => {
          if (!cancelled) {
            window.clearTimeout(fallbackTimer)
            setHasError(false)
          }
        })
        return player.ready()
      })
      .then(() => window.clearTimeout(fallbackTimer))
      .catch(showFallback)

    return () => {
      cancelled = true
      window.clearTimeout(fallbackTimer)
      player?.destroy().catch(() => {})
    }
  }, [videoUrl])

  return createPortal(
    <div className="video-modal__backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" ref={dialogRef}>
        <div className="video-modal__header">
          <h2 id="video-modal-title">Foundation of Hope Rebuild</h2>
          <button className="video-modal__close" type="button" aria-label="Close video modal" onClick={onClose}>×</button>
        </div>
        <div className="video-modal__frame">
          <iframe
            ref={iframeRef}
            src={videoUrl}
            title="Foundation of Hope Youth Centre rebuild documentary"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setHasError(true)}
          />
          {hasError && (
            <div className="video-modal__fallback" role="status">
              <p>The video player could not load.</p>
              <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">Watch the PISDK video on Vimeo</a>
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body
  )
}
