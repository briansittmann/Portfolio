import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MapModal({ isOpen, onClose }) {
  // Cerrar con ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Bloquear scroll mientras está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="w-full max-w-2xl bg-white dark:bg-surface-container rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-outline-variant/15">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-outline-variant/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="font-bold text-on-background tracking-tight">Valencia, Spain</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label="Close map"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Map */}
              <div className="w-full h-96">
                <iframe
                  title="Valencia, Spain"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.4537%2C39.4189%2C-0.3200%2C39.4894&layer=mapnik&marker=39.4699%2C-0.3763"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-primary/5 dark:bg-surface-container-high text-center">
                <a
                  href="https://www.openstreetmap.org/?mlat=39.4699&mlon=-0.3763#map=13/39.4699/-0.3763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-semibold hover:opacity-70 transition-opacity duration-200"
                >
                  Ver en mapa completo ↗
                </a>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
