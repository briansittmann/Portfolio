import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDR6MdHLwZ-f_tOzN4cVOCa3ux3uy8DD5m6sRqkTZ9tIx9DKEb7arhcxOPzchQOsesMHL2jb1KZLawAMXks4TZ0KY9HBFO22I0LdStNy2Lg65NAUW3iDDFh2yvtJfhEhwkD-eNLI7QJftMzI8tEmclZElhfWnKb0XslEzi16LuPnBOFionNZs-L5JQLDmgLacXqMzcLBiH6tXUHEppB7TTtY5RScML2NgwubBneCD9ot2eaIo0Zwy-M0votfKDezk6BnzfPGRW_17g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD2QwqHgFUT2NoSydVC-I2s4x-nbnCJozpguBH4n2h1jtz0wthfUommIBIR7PULaiGa-WC0JAMoVPoYYh3ZHHxwudPbLHA7Y8w513Qf_mQ7Fnwozwyj29HGrNqS8xrY9RQtsoIRUFl8UCsm1cQeweFv1n24O1eM8hAgYCEoZYRACzlgLELv1al1QIwYLmdSy3ZsSaErEE5YI3p-WTj1zNWdolKo-5uT1OANFrexi8OrNTWqw-4lHSxqAsFjjB1z9r8albsqBAu2ak0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCOmO7ZcfQFErb8nqCoNz6Y3YYfnYKbVMkY-etyYrPAhhMIFXlbWEu00Yik76bdJ1g1OblQJ1Z5KBYbUMVGad_iiOBHlpryGf_UEIlpUJOFMdbyYEGDVjeZv3gyKLc4I4FW7ZlhNrGcbSxZ6rzmSSKHKANwZWAkDbv2D_1_BbIYuCotUV2rWiY-eNujtIT3t5biDfgYu9bt2f7k5aGFoR6ow41T1tsrtyA4bjYTasf8r1AekCtBEuYFPI1Xwkvw-nZT6mmKYtZNCj0',
]

function ProjectCard({ project, img, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="group"
    >
      <div className="glass-effect dark:bg-surface-container-high rounded-2xl overflow-hidden mb-6 aspect-video border border-black/5 dark:border-outline-variant/15 shadow-sm relative">
        <img
          src={img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="px-6 py-2 bg-white/90 dark:bg-white backdrop-blur text-primary dark:text-black rounded-full font-bold text-sm shadow-xl">
            {project.label}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/5 dark:bg-surface-container rounded-full text-[10px] text-primary font-bold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-on-background">{project.title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{project.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="max-w-7xl mx-auto px-8 py-32">
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
      >
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-on-background">
            {t.projects.title} <span className="text-primary">{t.projects.highlight}</span>
          </h2>
          <p className="text-on-surface-variant text-xl max-w-xl">{t.projects.subtitle}</p>
        </div>
        <div className="h-px bg-black/5 dark:bg-outline-variant/30 flex-grow mx-8 hidden md:block" />
        <span className="text-on-surface-variant font-medium text-sm tracking-widest uppercase">
          {t.projects.count}
        </span>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        {t.projects.items.map((p, i) => (
          <ProjectCard key={i} project={p} img={images[i]} delay={i * 0.12} />
        ))}
      </div>
    </section>
  )
}
