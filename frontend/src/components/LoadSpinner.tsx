import React from 'react'
import { useI18n } from '../contexts/i18nContext'
import { Sparkles } from 'lucide-react'

const LoadingSpinner: React.FC = () => {
  const { t } = useI18n()

  return (
    <div className="fixed inset-0 bg-white bg-opacity-98 flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="bg-gray-900 p-6 rounded-full animate-pulse">
            <Sparkles className="h-12 w-12 text-white animate-spin" />
          </div>
          <div className="absolute inset-0 bg-gray-900 rounded-full animate-ping opacity-20"></div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {t.home.loading}
          </h3>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
