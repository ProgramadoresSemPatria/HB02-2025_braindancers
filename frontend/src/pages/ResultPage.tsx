import React from 'react'
import { useI18n } from '../contexts/i18nContext'
import { useLocation, useNavigate } from 'react-router-dom'
import type { AnalysisResult } from '../types/ai-response'
import {
  ArrowLeft,
  Palette,
  Shirt,
  Lightbulb,
  RotateCcw,
} from 'lucide-react'

const ResultPage: React.FC = () => {
  const { t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()

  const result = location.state?.result as AnalysisResult

  if (!result) {
    navigate('/')
    return null
  }

  const handleTryAgain = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">{t.result.back}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <Shirt className="h-6 w-6 text-gray-600" />
                  <span>{t.result.yourOutfit}</span>
                </h2>
              </div>
              <div className="p-6">
                <img
                  src={result.imageUrl}
                  alt={t.result.yourOutfit}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Shirt className="h-5 w-5 text-gray-600" />
                <span>{t.result.detectedItems}</span>
              </h3>
              <div className="space-y-3">
                {result.detectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {Math.round(item.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Palette className="h-5 w-5 text-gray-600" />
                <span>{t.result.colors}</span>
              </h3>
              <div className="space-y-3">
                {result.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{color.name}</p>
                      <p className="text-sm text-gray-500">{color.hex}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {color.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <Lightbulb className="h-6 w-6" />
                  <span>{t.result.styleTip}</span>
                </h2>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {t.result.suggestion}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {result.styleTip.suggestion}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {t.result.why}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {result.styleTip.why}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <button
                    onClick={handleTryAgain}
                    className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>{t.result.tryAgain}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="text-center space-y-3">
                <div className="bg-white p-3 rounded-full w-fit mx-auto">
                  <Lightbulb className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.result.tipTitle}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t.result.tipContent}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage