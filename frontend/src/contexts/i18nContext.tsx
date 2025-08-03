import React, { useMemo } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import type { Language, Translations } from '../types/i18n'
import { pt } from '../locales/pt'
import { en } from '../locales/en'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = { pt, en }

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)

    const savedLanguage = localStorage.getItem(
      'veste-ai-language',
    ) as Language | null
    let initialLanguage: Language = 'pt'

    if (savedLanguage === 'pt' || savedLanguage === 'en') {
      initialLanguage = savedLanguage
    } else {
      const browserLanguage = navigator.language.toLowerCase()
      initialLanguage = browserLanguage.startsWith('pt') ? 'pt' : 'en'
    }

    setLanguage(initialLanguage)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('veste-ai-language', language)
    }
  }, [language, isHydrated])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
