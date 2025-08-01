'use client'

import { Languages } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../contexts/i18nContext'
import type { Language } from '../types/i18n'

export function LanguageSelector() {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
          <div className="py-2 min-w-[100px]">
            <button
              onClick={() => handleLanguageChange('pt')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${
                language === 'pt'
                  ? 'text-purple-400 bg-slate-700/50'
                  : 'text-gray-300'
              }`}
            >
              Português
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${
                language === 'en'
                  ? 'text-purple-400 bg-slate-700/50'
                  : 'text-gray-300'
              }`}
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
