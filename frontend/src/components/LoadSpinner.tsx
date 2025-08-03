import React from 'react'
import { useI18n } from '../contexts/i18nContext'
import { Sparkles } from 'lucide-react'

const LoadingSpinner: React.FC = () => {
  const { t } = useI18n()

  return (
    <div className="fixed inset-0 bg-bg-overlay dark:bg-dark-bg-overlay flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="bg-button-primary-bg dark:bg-dark-button-primary-bg p-6 rounded-full animate-pulse">
            <Sparkles className="h-12 w-12 text-button-primary-text dark:text-dark-button-primary-text animate-spin" />
          </div>
          <div className="absolute inset-0 bg-button-primary-bg dark:bg-dark-button-primary-bg rounded-full animate-ping opacity-20"></div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
            {t.home.loading}
          </h3>
          <div className="w-48 h-1 bg-bg-tertiary dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
            <div className="h-full bg-button-primary-bg dark:bg-dark-button-primary-bg rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
