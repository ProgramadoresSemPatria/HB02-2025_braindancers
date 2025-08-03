import { Languages } from 'lucide-react'
import { useI18n } from '../contexts/i18nContext'
import type { Language } from '../types/i18n'

export function LanguageSelector() {
  const { language, setLanguage } = useI18n()

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'pt' ? 'en' : 'pt'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer flex items-center space-x-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  )
}
