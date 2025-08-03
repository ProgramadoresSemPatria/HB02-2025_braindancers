import React from 'react'
import { Sparkles } from 'lucide-react'
import { useI18n } from '../contexts/i18nContext'
import { LanguageSelector } from './LanguageSelector'
import ThemeToggle from './ThemeToggle'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <header className="bg-header-bg dark:bg-dark-header-bg border-b border-header-border dark:border-dark-header-border backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <Sparkles className="h-6 w-6 text-text-primary dark:text-dark-text-primary" />
            <div>
              <h1 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                {t.app.name}
              </h1>
            </div>
          </button>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
