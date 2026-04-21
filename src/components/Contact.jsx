import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import MapModal from './MapModal'
import ContactModal from './ContactModal'

function useTypewriter(text, started, speed = 60) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
  }, [text])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, started, speed])

  return displayed
}

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [mapOpen,     setMapOpen]     = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const fullText   = `${t.contact.title} ${t.contact.highlight}`
  const titleLen   = t.contact.title.length + 1  // +1 for space
  const displayed  = useTypewriter(fullText, inView, 70)

  const titlePart  = displayed.slice(0, Math.min(displayed.length, titleLen))
  const highlightPart = displayed.length > titleLen
    ? displayed.slice(titleLen)
    : ''
  const showCursor = displayed.length < fullText.length

  return (
    <>
      <section id="contact" className="max-w-7xl mx-auto px-8 py-32 mb-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="bg-white/60 dark:bg-surface-container backdrop-blur-xl border border-black/5 dark:border-outline-variant/10 rounded-3xl p-12 md:p-24 relative overflow-hidden text-center shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 liquid-gradient blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-on-background">
              {titlePart}
              {highlightPart && (
                <span className="text-primary">{highlightPart}</span>
              )}
              {showCursor && (
                <span className="animate-pulse text-primary">|</span>
              )}
            </h2>

            <p className="text-on-surface-variant text-xl">{t.contact.subtitle}</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href="mailto:brian.sittmann@hotmail.com"
                className="text-2xl md:text-3xl font-bold text-on-background hover:text-primary transition-colors duration-300"
              >
                brian.sittmann@hotmail.com
              </a>
              <button
                onClick={() => setMapOpen(true)}
                className="text-on-surface-variant font-semibold flex items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer pt-[4px]"
              >
                <span className="material-symbols-outlined text-base">location_on</span>
                {t.contact.location}
              </button>
            </div>
            <button
              onClick={() => setContactOpen(true)}
              className="px-12 py-5 rounded-full liquid-gradient text-on-primary-fixed font-bold text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              {t.contact.cta}
            </button>
          </div>
        </motion.div>
      </section>

      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
