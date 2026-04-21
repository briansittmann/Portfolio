import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const icons = ['database', 'smartphone', 'terminal', 'sync']

const DARK_SHADOW  = '0 8px 32px rgba(133, 173, 255, 0.45)'
const LIGHT_SHADOW = '0 8px 32px rgba(0, 113, 227, 0.25)'

function Card({ icon, title, desc, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { isDark } = useTheme()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass-effect dark:bg-surface-container-high p-8 rounded-2xl border border-black/5 dark:border-outline-variant/15 shadow-sm cursor-default"
      whileHover={{ scale: 1.05, boxShadow: isDark ? DARK_SHADOW : LIGHT_SHADOW }}
      transition={{ duration: 0.5 }}
    >
      <span className="material-symbols-outlined text-primary text-4xl mb-4 block">{icon}</span>
      <h3 className="font-bold text-lg mb-2 text-on-background">{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="bg-white/40 dark:bg-surface-container-low backdrop-blur-md py-32 border-y border-black/5 dark:border-outline-variant/10"
    >
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">

        {/* Text */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-background">
            {t.about.title} <span className="text-primary">{t.about.highlight}</span>
          </h2>
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          <div className="pt-4 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-on-surface">{t.about.location}</span>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">{t.about.locationLabel}</span>
            </div>
            <div className="h-10 w-px bg-black/10 dark:bg-outline-variant/30" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-on-surface">{t.about.availability}</span>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">{t.about.availabilityLabel}</span>
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 pt-12">
            <Card icon={icons[0]} title={t.about.cards[0].title} desc={t.about.cards[0].desc} delay={0} />
            <Card icon={icons[1]} title={t.about.cards[1].title} desc={t.about.cards[1].desc} delay={0.1} />
          </div>
          <div className="space-y-6">
            <Card icon={icons[2]} title={t.about.cards[2].title} desc={t.about.cards[2].desc} delay={0.15} />
            <Card icon={icons[3]} title={t.about.cards[3].title} desc={t.about.cards[3].desc} delay={0.25} />
          </div>
        </div>

      </div>
    </section>
  )
}
