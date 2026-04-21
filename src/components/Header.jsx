import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const navIds = [
  { key: 'about',    href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'contact',  href: '#contact' },
]

export default function Header() {
  const { isDark, toggle } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const [active, setActive] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const dropdownRef = useRef(null)

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const sections = navIds
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-black/5 dark:border-white/5 theme-transition">
      <div className="flex justify-between items-center px-4 md:px-8 h-[72px] max-w-7xl mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">blur_on</span>
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-on-background hover:text-primary cursor-pointer transition-colors duration-300"
          >
            Brian Sittmann
          </a>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navIds.map(({ key, href }) => {
            const isActive = active === href
            return (
              <a
                key={href}
                href={href}
                className={`text-sm tracking-tight transition-all duration-300 ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                {t.nav[key]}
              </a>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3 ml-2 md:ml-0">

          {/* Language selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(prev => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:text-primary text-xs font-bold tracking-widest uppercase transition-all duration-300"
            >
              {lang}
              <span className="material-symbols-outlined text-base leading-none" style={{ fontSize: 16 }}>
                {langOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl overflow-hidden shadow-lg border border-black/5 dark:border-outline-variant/15 glass-effect dark:bg-surface-container">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'es', label: 'Spanish' },
                ].map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setLangOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      lang === code
                        ? 'text-primary font-semibold bg-primary/5'
                        : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <div className="bg-surface-container-highest/50 p-1 rounded-full flex items-center gap-1">
            <button
              onClick={toggle}
              aria-label="Switch to dark mode"
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? 'bg-surface-container text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined block">dark_mode</span>
            </button>
            <button
              onClick={toggle}
              aria-label="Switch to light mode"
              className={`p-2 rounded-full transition-all duration-300 ${
                !isDark
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined block">light_mode</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  )
}
