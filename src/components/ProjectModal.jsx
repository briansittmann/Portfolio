import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import VideoModal from './VideoModal'

const DARK_SHADOW  = '0 8px 32px rgba(133, 173, 255, 0.45)'
const LIGHT_SHADOW = '0 8px 32px rgba(0, 113, 227, 0.25)'

export default function ProjectModal({ isOpen, onClose, project, coverImage, carouselImages, videoUrl, repoUrl, repoBackUrl, presentationUrl }) {
  const { t } = useLanguage()
  const { isDark } = useTheme()
  const [videoOpen, setVideoOpen] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(0)

  const images = carouselImages ?? (coverImage ? [coverImage] : [])
  const prev = () => setCarouselIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setCarouselIdx(i => (i + 1) % images.length)

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') {
        if (videoOpen) setVideoOpen(false)
        else onClose()
      }
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, videoOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) setCarouselIdx(0)
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!project) return null

  const { stack: stackLabel, description: descLabel, highlights: detailsLabel,
          repo: repoLabel, repoFront: repoFrontLabel, repoBack: repoBackLabel,
          presentation: presentationLabel } = t.modal

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[101] flex items-end md:items-center justify-center p-0 md:p-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onClose}
          >
            <div className="w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-white dark:bg-surface-container border border-black/5 dark:border-outline-variant/15 shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>

              {/* Cover / Carousel */}
              <div className="relative w-full aspect-video shrink-0 overflow-hidden rounded-t-3xl md:rounded-t-3xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:scale-105 transition-transform duration-300"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>

                <motion.div
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  drag={images.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) next()
                    else if (info.offset.x > 50) prev()
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={carouselIdx}
                      src={images[carouselIdx]}
                      alt={project.title}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </AnimatePresence>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-container via-transparent to-transparent pointer-events-none" />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:scale-110 transition-all duration-200"
                    >
                      <span className="material-symbols-outlined text-lg leading-none">chevron_left</span>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:scale-110 transition-all duration-200"
                    >
                      <span className="material-symbols-outlined text-lg leading-none">chevron_right</span>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 items-center pointer-events-none">
                      {images.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${i === carouselIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="px-8 pb-10 -mt-10 pt-7 relative z-10 space-y-8">

                {/* Tags + title */}
                <div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-background leading-none">
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{descLabel}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg">{project.desc}</p>
                </div>

                {/* Stack chips */}
                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{stackLabel}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-5 py-2 rounded-full bg-surface-container-low dark:bg-surface-container-high border border-black/5 dark:border-outline-variant/20 text-on-background text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detail highlight cards */}
                {project.details && project.details.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{detailsLabel}</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.details.map((d, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="surface-card p-6 cursor-default space-y-2"
                          whileHover={{ scale: 1.05, boxShadow: isDark ? DARK_SHADOW : LIGHT_SHADOW }}
                          whileTap={{ scale: 1.05, boxShadow: isDark ? DARK_SHADOW : LIGHT_SHADOW }}
                        >
                          <span className="material-symbols-outlined text-primary text-4xl block">{d.icon}</span>
                          <h4 className="font-bold text-lg text-on-background">{d.title}</h4>
                          <p className="text-on-surface-variant text-sm leading-relaxed">{d.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons — 2-column grid */}
                {(videoUrl || repoUrl || repoBackUrl || presentationUrl) && (
                  <div className="grid grid-cols-2 gap-3">
                    {videoUrl && (
                      <button onClick={() => setVideoOpen(true)} className="btn-primary">
                        <span className="material-symbols-outlined text-base">play_circle</span>
                        {project.label}
                      </button>
                    )}
                    {presentationUrl && (
                      <a href={presentationUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                        {presentationLabel}
                      </a>
                    )}
                    {repoUrl && repoBackUrl ? (
                      <>
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                          <span className="material-symbols-outlined text-base">smartphone</span>
                          {repoFrontLabel}
                        </a>
                        <a href={repoBackUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                          <span className="material-symbols-outlined text-base">dns</span>
                          {repoBackLabel}
                        </a>
                      </>
                    ) : repoUrl ? (
                      <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <span className="material-symbols-outlined text-base">code</span>
                        {repoLabel}
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={videoUrl} />
        </>
      )}
    </AnimatePresence>
  )
}
