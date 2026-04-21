import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const DARK_SHADOW  = '0 8px 32px rgba(133, 173, 255, 0.45)'
const LIGHT_SHADOW = '0 8px 32px rgba(0, 113, 227, 0.25)'

const techStack = ['Java', 'Spring Boot', 'Hibernate', 'React Native', 'TypeScript', 'MySQL', 'Claude Code', 'MongoDB', 'Git', 'AWS']

// Brand colors per technology
const brandColors = {
  'Java':         '#ED8B00',
  'Spring Boot':  '#6DB33F',
  'Hibernate':    '#BCAE79',
  'React Native': '#61DAFB',
  'TypeScript':   '#3178C6',
  'MySQL':        '#4479A1',
  'Claude Code':  '#D97706',
  'MongoDB':      '#47A248',
  'Git':          '#F05032',
  'AWS':          '#FF9900',
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export default function Skills() {
  const { t } = useLanguage()
  const { isDark } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="max-w-7xl mx-auto px-8 py-32 border-t border-black/5 dark:border-outline-variant/10">
      <div className="grid lg:grid-cols-3 gap-16">

        {/* Tech ecosystem */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="lg:col-span-1 space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-on-background">
            {t.skills.ecosystemTitle} <span className="text-primary">{t.skills.ecosystemHighlight}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? {
                  opacity: 1,
                  scale: 1,
                  y: [0, -5, 0],
                  color: isDark ? '#ffffff' : '#1C1C1E',
                } : {}}
                transition={{
                  opacity:  { duration: 0.35, delay: i * 0.05 },
                  scale:    { duration: 0.35, delay: i * 0.05 },
                  y: {
                    duration: 2.4 + (i % 4) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  },
                }}
                whileHover={{
                  scale: 1.15,
                  color: brandColors[tech],
                  boxShadow: `0 0 14px 3px rgba(${hexToRgb(brandColors[tech])}, ${isDark ? '0.6' : '0.35'})`,
                  transition: { duration: 0.2 },
                }}
                className="px-5 py-2.5 rounded-full glass-effect dark:bg-surface-container-high border border-black/5 dark:border-outline-variant/15 text-xs font-bold text-on-background dark:text-on-surface cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Methodology */}
        <div className="lg:col-span-2 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-on-background"
          >
            {t.skills.methodologyTitle}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.skills.methodology.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-surface-container-high/40 backdrop-blur-sm border border-black/5 dark:border-outline-variant/15 space-y-4 shadow-sm cursor-default"
                whileHover={{ scale: 1.05, boxShadow: isDark ? DARK_SHADOW : LIGHT_SHADOW }}
                transition={{ duration: 0.5 }}
              >
                <span className="material-symbols-outlined text-primary">{m.icon}</span>
                <h4 className="font-bold text-lg text-on-background">{m.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
