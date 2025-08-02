import React from 'react'
import { Sparkles } from 'lucide-react'
import { useI18n } from '../contexts/i18nContext'
import { LanguageSelector } from './LanguageSelector'

const Header: React.FC = () => {
  const { t } = useI18n()

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-gray-900" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {t.app.name}
              </h1>
            </div>
          </div>

          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}

export default Header
