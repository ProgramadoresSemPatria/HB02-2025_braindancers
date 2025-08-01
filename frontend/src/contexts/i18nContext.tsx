"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language, Translations } from "../types/i18n"
import { pt } from "../locales/pt"
import { en } from "../locales/en"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = { pt, en }

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("feynman-language") as Language
    const browserLanguage = navigator.language.startsWith("pt") ? "pt" : "en"

    setLanguage(savedLanguage || browserLanguage)
  }, [])

  useEffect(() => {
    localStorage.setItem("feynman-language", language)
  }, [language])

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
