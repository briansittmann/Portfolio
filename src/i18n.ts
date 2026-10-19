// The site's two languages. English is the default at `/`, Spanish lives at `/es/` (see `i18n` in astro.config.mjs).
// Components read the page's language from `Astro.currentLocale` and keep their own copy for each one.
export const languages = { en: 'English', es: 'Español' } as const
export type Lang = keyof typeof languages

export const langOf = (locale: string | undefined): Lang => (locale === 'es' ? 'es' : 'en')
