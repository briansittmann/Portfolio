import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t border-black/5 dark:border-outline-variant/10 bg-white/40 dark:bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full gap-8 max-w-7xl mx-auto">
        <div className="space-y-2">
          <a href="#" className="font-bold text-primary text-xl hover:opacity-70 cursor-pointer transition-opacity duration-300">
            Brian Sittmann
          </a>
          <p className="text-on-surface-variant text-xs font-medium">{t.footer.copyright}</p>
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          {t.footer.links.map(link => (
            <a
              key={link}
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-xs font-semibold"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
