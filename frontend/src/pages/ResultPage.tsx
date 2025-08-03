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
    <main className="min-h-screen bg-bg-secondary dark:bg-dark-bg-secondary">
      <motion.div
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer inline-flex items-center space-x-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">{t.result.back}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-bg-primary dark:bg-dark-bg-primary rounded-2xl shadow-sm border border-border-primary dark:border-dark-border-primary overflow-hidden">
              <div className="p-6 border-b border-border-primary dark:border-dark-border-primary">
                <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary flex items-center space-x-3">
                  <Shirt className="h-6 w-6 text-icon-primary dark:text-dark-icon-primary" />
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

            <div className="bg-bg-primary dark:bg-dark-bg-primary rounded-2xl shadow-sm border border-border-primary dark:border-dark-border-primary p-6">
              <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4 flex items-center space-x-2">
                <Shirt className="h-5 w-5 text-icon-primary dark:text-dark-icon-primary" />
                <span>{t.result.detectedItems}</span>
              </h3>
              <div className="space-y-3">
                {result?.identified_clothes?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-bg-tertiary dark:bg-dark-bg-tertiary rounded-lg hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
                  >
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-primary dark:bg-dark-bg-primary rounded-2xl shadow-sm border border-border-primary dark:border-dark-border-primary p-6">
              <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4 flex items-center space-x-2">
                <Palette className="h-5 w-5 text-icon-primary dark:text-dark-icon-primary" />
                <span>{t.result.colors}</span>
              </h3>
              <div className="space-y-3">
                {result?.colors?.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-bg-tertiary dark:bg-dark-bg-tertiary rounded-lg"
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-bg-primary dark:border-dark-bg-primary shadow-md"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary dark:text-dark-text-primary">
                        {colorNames[index] || '...'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-bg-primary dark:bg-dark-bg-primary rounded-2xl shadow-sm border border-border-primary dark:border-dark-border-primary overflow-hidden">
              <div className="bg-button-primary-bg dark:bg-dark-button-primary-bg p-6">
                <h2 className="text-2xl font-bold text-button-primary-text dark:text-dark-button-primary-text flex items-center space-x-3">
                  <Lightbulb className="h-6 w-6" />
                  <span>{t.result.styleTip}</span>
                </h2>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                    {t.result.suggestion}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed text-base">
                    {result?.suggestion}
                  </p>
                </div>

                <div className="border-t border-border-primary dark:border-dark-border-primary pt-6">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                    {t.result.why}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed text-base">
                    {result?.why}
                  </p>
                </div>

                <div className="border-t border-border-primary dark:border-dark-border-primary pt-6">
                  <button
                    onClick={handleTryAgain}
                    className="w-full cursor-pointer flex items-center justify-center space-x-3 px-6 py-4 bg-button-primary-bg dark:bg-dark-button-primary-bg text-button-primary-text dark:text-dark-button-primary-text font-medium rounded-lg hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover transition-all"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>{t.result.tryAgain}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-bg-tertiary dark:bg-dark-bg-tertiary rounded-2xl p-6">
              <div className="text-center space-y-3">
                <div className="bg-bg-primary dark:bg-dark-bg-primary p-3 rounded-full w-fit mx-auto">
                  <Lightbulb className="h-6 w-6 text-icon-primary dark:text-dark-icon-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                  {t.result.tipTitle}
                </h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">
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
