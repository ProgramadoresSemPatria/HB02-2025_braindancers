import React, { useEffect, useState } from 'react'
import { useI18n } from '../contexts/i18nContext'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Palette, Shirt, Lightbulb, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAPIResponse } from '../contexts/APIResponseContext'
import { useImage } from '../contexts/ImageContext'
import { getColorNames } from '../utils/getColorInfo'

const ResultPage: React.FC = () => {
  const { t } = useI18n()
  const { result } = useAPIResponse()
  const { image } = useImage()
  const [colorNames, setColorNames] = useState<string[]>([])

  const navigate = useNavigate()

  const handleTryAgain = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!result) {
      navigate('/')
    }
  }, [result])

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchColorNames = async () => {
      if (result?.colors) {
        try {
          const names = await getColorNames(result.colors)
          setColorNames(names)
        } catch (err) {
          console.error('Erro ao buscar nomes das cores', err)
        }
      }
    }

    fetchColorNames()
  }, [result?.colors])

  return (
    <main className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
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
                  src={image ? URL.createObjectURL(image) : undefined}
                  alt={t.result.yourOutfit}
                  className="w-full h-64 sm:h-80 object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Shirt className="h-5 w-5 text-gray-600" />
                <span>{t.result.detectedItems}</span>
              </h3>
              <div className="space-y-3">
                {result?.identified_clothes?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium text-gray-900">{item}</p>
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
                {result?.colors?.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {colorNames[index] || '...'}
                      </p>
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
                    {result?.suggestion}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {t.result.why}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {result?.why}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <button
                    onClick={handleTryAgain}
                    className="w-full cursor-pointer flex items-center justify-center space-x-3 px-6 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
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
      </motion.div>
    </main>
  )
}

export default ResultPage
