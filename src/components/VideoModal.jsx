import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const getEmbedUrl = (url) => {
    const shortsMatch = url.match(/shorts\/([^?&]+)/)
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1`
    return url.replace('watch?v=', 'embed/') + '?autoplay=1'
  }
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : ''

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[102] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[103] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
          >
            <div className="w-full max-w-3xl relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={embedUrl}
                  title="Project video"
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
