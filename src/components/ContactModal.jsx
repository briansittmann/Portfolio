import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../context/LanguageContext'

const SERVICE_ID       = 'service_isiy1zh'
const TEMPLATE_OWNER   = 'template_ysh9wyf'
const TEMPLATE_VISITOR = 'template_61i9xnf'
const PUBLIC_KEY       = 'HSL_-nSPsOfQ__zfp'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const autoReply = {
  en: {
    subject: 'Message received — Brian Sittmann Portfolio',
    message: (name) =>
      `Hi ${name},\n\nThank you for reaching out! Your message has been received and I'll get back to you shortly.\n\nBest regards,\nBrian Sittmann`,
  },
  es: {
    subject: 'Mensaje recibido — Portfolio Brian Sittmann',
    message: (name) =>
      `Hola ${name},\n\n¡Gracias por escribirme! Tu mensaje ha sido recibido y te responderé en breve.\n\nUn saludo,\nBrian Sittmann`,
  },
}

const copy = {
  en: {
    title:   'Send a Message',
    name:    'Your name',
    email:   'Your email',
    subject: 'Subject',
    message: 'Your message',
    send:    'Send Email',
    cancel:  'Cancel',
    sending: 'Sending...',
    success: "Message sent! You'll receive a confirmation shortly.",
    error:   'Something went wrong. Please try again.',
    placeholder: {
      name:    'John Doe',
      email:   'john@example.com',
      subject: 'Project proposal...',
      message: 'Hi Brian, I wanted to reach out about...',
    },
    errors: {
      name:        'Name is required.',
      email:       'Email is required.',
      emailFormat: 'Enter a valid email address.',
      subject:     'Subject is required.',
      message:     'Message is required.',
    },
  },
  es: {
    title:   'Enviar un mensaje',
    name:    'Tu nombre',
    email:   'Tu email',
    subject: 'Asunto',
    message: 'Tu mensaje',
    send:    'Enviar Email',
    cancel:  'Cancelar',
    sending: 'Enviando...',
    success: '¡Mensaje enviado! Recibirás una confirmación en breve.',
    error:   'Algo salió mal. Por favor inténtalo de nuevo.',
    placeholder: {
      name:    'Juan García',
      email:   'juan@ejemplo.com',
      subject: 'Propuesta de proyecto...',
      message: 'Hola Brian, quería contactarte sobre...',
    },
    errors: {
      name:        'El nombre es obligatorio.',
      email:       'El email es obligatorio.',
      emailFormat: 'Introduce un email válido.',
      subject:     'El asunto es obligatorio.',
      message:     'El mensaje es obligatorio.',
    },
  },
}

const EMPTY_FORM   = { name: '', email: '', subject: '', message: '' }
const EMPTY_ERRORS = { name: '', email: '', subject: '', message: '' }

function validate(form, errors) {
  const e = { ...EMPTY_ERRORS }
  if (!form.name.trim())                  e.name    = errors.name
  if (!form.email.trim())                 e.email   = errors.email
  else if (!EMAIL_REGEX.test(form.email)) e.email   = errors.emailFormat
  if (!form.subject.trim())               e.subject = errors.subject
  if (!form.message.trim())               e.message = errors.message
  return e
}

const inputBase =
  'w-full px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container-high ' +
  'text-on-background placeholder:text-on-surface-variant/50 text-sm ' +
  'focus:outline-none transition-all duration-200'

export default function ContactModal({ isOpen, onClose }) {
  const { lang } = useLanguage()
  const f = copy[lang]

  const [form,    setForm]    = useState(EMPTY_FORM)
  const [errors,  setErrors]  = useState(EMPTY_ERRORS)
  const [touched, setTouched] = useState(EMPTY_ERRORS)
  const [status,  setStatus]  = useState('idle') // idle | sending | success | error

  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM)
      setErrors(EMPTY_ERRORS)
      setTouched(EMPTY_ERRORS)
      setStatus('idle')
    }
  }, [isOpen])

  const handleChange = e => {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    if (touched[name]) {
      const newErrors = validate(updated, f.errors)
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = e => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate(form, f.errors)
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    const newErrors = validate(form, f.errors)
    setErrors(newErrors)
    if (Object.values(newErrors).some(v => v)) return

    setStatus('sending')
    try {
      // Email to Brian
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_OWNER,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
        },
        PUBLIC_KEY
      )

      // Auto-reply to visitor
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_VISITOR,
        {
          from_email:   form.email,
          auto_subject: autoReply[lang].subject,
          auto_message: autoReply[lang].message(form.name),
        },
        PUBLIC_KEY
      )

      setStatus('success')
      setTimeout(() => { onClose() }, 3000)
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const fieldClass = name =>
    `${inputBase} border ${
      errors[name]
        ? 'border-red-400 focus:ring-2 focus:ring-red-400/40'
        : 'border-black/5 dark:border-outline-variant/15 focus:ring-2 focus:ring-primary/40'
    }`

  const isSending = status === 'sending'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="w-full max-w-lg bg-white dark:bg-surface-container rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-outline-variant/15">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-outline-variant/15">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <span className="font-bold text-on-background tracking-tight">{f.title}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Success / Error banner */}
              <AnimatePresence>
                {(status === 'success' || status === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`px-6 py-3 text-sm font-semibold flex items-center gap-2 ${
                      status === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-500'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {status === 'success' ? 'check_circle' : 'error'}
                    </span>
                    {status === 'success' ? f.success : f.error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-4">

                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {f.name} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={f.placeholder.name}
                      disabled={isSending}
                      className={fieldClass('name')}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {f.email} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={f.placeholder.email}
                      disabled={isSending}
                      className={fieldClass('email')}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {f.subject} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.placeholder.subject}
                    disabled={isSending}
                    className={fieldClass('subject')}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {f.message} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.placeholder.message}
                    disabled={isSending}
                    className={`${fieldClass('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSending}
                    className="flex-1 py-3 rounded-full border border-black/10 dark:border-outline-variant/30 text-on-surface-variant font-semibold text-sm hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-all duration-200 disabled:opacity-50"
                  >
                    {f.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex-1 py-3 rounded-full liquid-gradient text-on-primary-fixed font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isSending ? 'hourglass_empty' : 'send'}
                    </span>
                    {isSending ? f.sending : f.send}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
