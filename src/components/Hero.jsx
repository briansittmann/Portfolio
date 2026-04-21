import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import heroLight from '../assets/images/heroLogoLight.png'
import heroDark from '../assets/images/heroLogoDark.png'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  const profilePhoto = isDark ? heroDark : heroLight

  return (
    <section className="max-w-7xl mx-auto px-8 mb-32">
      <div className="flex flex-col md:flex-row items-center gap-16">

        {/* Avatar */}
        <motion.div
          className="relative w-64 h-64 md:w-96 md:h-96 shrink-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 liquid-gradient rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-surface-container-high shadow-2xl relative z-10">
            <img
              src={profilePhoto}
              alt="Brian Sittmann - Full Stack Developer"
              className="w-full h-full object-cover scale-[1.04] hover:scale-[1.12] transition-transform duration-500 ease-in-out"
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold tracking-wide text-xs uppercase"
            >
              {t.hero.badge}
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-on-background"
            >
              {t.hero.title} <br />
              <span className="text-primary">{t.hero.highlight}</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl text-on-surface-variant font-normal tracking-tight max-w-2xl leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>
          </div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a
              href="#"
              className="px-8 py-4 rounded-full liquid-gradient text-on-primary-fixed font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined">description</span>
              {t.hero.cv}
            </a>
            <a
              href="https://github.com/briansittmann"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full glass-effect text-on-background font-bold flex items-center gap-2 hover:bg-[#004FA3]/20 hover:border-[#004FA3]/30 dark:hover:bg-white/10 dark:hover:border-white/20 transition-all duration-300 border border-black/5 dark:border-white/10 shadow-sm"
            >
              <span className="material-symbols-outlined text-primary">code</span>
              {t.hero.github}
            </a>
            <a
              href="https://www.linkedin.com/in/brian-sittmann-50b6923b1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full glass-effect text-on-background font-bold flex items-center gap-2 hover:bg-[#004FA3]/20 hover:border-[#004FA3]/30 dark:hover:bg-white/10 dark:hover:border-white/20 transition-all duration-300 border border-black/5 dark:border-white/10 shadow-sm"
            >
              <span className="material-symbols-outlined text-primary">person</span>
              {t.hero.linkedin}
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
