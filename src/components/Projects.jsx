import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import frogNinjaCover from '../assets/images/frogNinjaCover.png'
import plataformer2D from '../assets/images/plataformer2D.png'
import caloriaBanner from '../assets/images/caloriaBanner.jpg'
import caloriaScreens from '../assets/images/caloriaScreens.png'
import ProjectModal from './ProjectModal'

const images = [
  caloriaBanner,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD2QwqHgFUT2NoSydVC-I2s4x-nbnCJozpguBH4n2h1jtz0wthfUommIBIR7PULaiGa-WC0JAMoVPoYYh3ZHHxwudPbLHA7Y8w513Qf_mQ7Fnwozwyj29HGrNqS8xrY9RQtsoIRUFl8UCsm1cQeweFv1n24O1eM8hAgYCEoZYRACzlgLELv1al1QIwYLmdSy3ZsSaErEE5YI3p-WTj1zNWdolKo-5uT1OANFrexi8OrNTWqw-4lHSxqAsFjjB1z9r8albsqBAu2ak0',
  frogNinjaCover,
]

const projectMeta = [
  { coverImage: caloriaScreens, videoUrl: 'https://youtube.com/shorts/SMwFc1f5Tf8', repoUrl: 'https://github.com/briansittmann/CalorIA_SDK53', repoBackUrl: 'https://github.com/briansittmann/caloria-backend', presentationUrl: '/Presentacion_CalorIA.pdf' },
  { coverImage: null,          videoUrl: null, repoUrl: null },
  { coverImage: plataformer2D, videoUrl: 'https://www.youtube.com/watch?v=5bU7d4cKiBE', repoUrl: 'https://github.com/briansittmann/plataformer2D' },
]

function ProjectCard({ project, img, delay, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="group cursor-pointer"
      onClick={onClick}
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
  const [selectedIndex, setSelectedIndex] = useState(null)

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
          <ProjectCard
            key={i}
            project={p}
            img={images[i]}
            delay={i * 0.12}
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        project={selectedIndex !== null ? t.projects.items[selectedIndex] : null}
        coverImage={selectedIndex !== null ? (projectMeta[selectedIndex].coverImage ?? images[selectedIndex]) : null}
        videoUrl={selectedIndex !== null ? projectMeta[selectedIndex].videoUrl : null}
        repoUrl={selectedIndex !== null ? projectMeta[selectedIndex].repoUrl : null}
        repoBackUrl={selectedIndex !== null ? projectMeta[selectedIndex].repoBackUrl : null}
        presentationUrl={selectedIndex !== null ? projectMeta[selectedIndex].presentationUrl : null}
      />
    </section>
  )
}
