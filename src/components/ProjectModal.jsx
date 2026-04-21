import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import VideoModal from './VideoModal'

export default function ProjectModal({ isOpen, onClose, project, coverImage, videoUrl, repoUrl }) {
  const { lang } = useLanguage()
  const [videoOpen, setVideoOpen] = useState(false)

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
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!project) return null

  const stackLabel = lang === 'es' ? 'Stack Tecnológico' : 'Tech Stack'
  const descLabel  = lang === 'es' ? 'Descripción'       : 'Description'
  const repoLabel  = lang === 'es' ? 'Ver Repositorio'   : 'View Repository'

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
          >
            <div className="w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-white dark:bg-surface-container border border-black/5 dark:border-outline-variant/15 shadow-2xl flex flex-col">

              {/* Cover image */}
              <div className="relative w-full aspect-video shrink-0 overflow-hidden rounded-t-3xl md:rounded-t-3xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:scale-105 transition-transform duration-300"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <img
                  src={coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-container via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="px-8 pb-10 -mt-10 relative z-10 space-y-8">

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

                {/* Action buttons */}
                {(videoUrl || repoUrl) && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {videoUrl && (
                      <button
                        onClick={() => setVideoOpen(true)}
                        className="w-full sm:w-auto px-8 py-4 rounded-full liquid-gradient text-on-primary-fixed font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span className="material-symbols-outlined">play_circle</span>
                        {project.label}
                      </button>
                    )}
                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-8 py-4 rounded-full border border-black/10 dark:border-outline-variant/30 text-on-background font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-all duration-300"
                      >
                        <span className="material-symbols-outlined">code</span>
                        {repoLabel}
                      </a>
                    )}
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
