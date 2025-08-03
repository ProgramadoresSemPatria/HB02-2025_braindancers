import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useI18n } from '../contexts/i18nContext'
import ImageUpload from '../components/ImageUpload'
import LoadingSpinner from '../components/LoadSpinner'
import { Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useImage } from '../contexts/ImageContext'
import { useAPIResponse } from '../contexts/APIResponseContext'
import type { APIResponse } from '../types/ai-response'

const UploadPage: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { setResult } = useAPIResponse()
  const { image: selectedImage, setImage: setSelectedImage } = useImage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const language = searchParams.get('lang') || 'en'

  const API_URL = import.meta.env.VITE_API_URL

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    setError(null)
  }

  const handleClearImage = () => {
    setSelectedImage(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('language', language)

      const response = await fetch( `${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      const resultData: APIResponse = await response.json()
      const uniqueColors = [...new Set(resultData.colors)]
      const resultWithUniqueColors: APIResponse = {
        ...resultData,
        colors: uniqueColors,
      }
      setResult(resultWithUniqueColors)
      navigate('/result', { state: { result: resultWithUniqueColors } })
    } catch (err) {
      console.error(err)
      setError(t.errors.uploadError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary dark:bg-dark-bg-primary py-24 flex flex-col justify-center items-center">
      {isLoading && <LoadingSpinner />}
      <motion.div
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-text-primary dark:text-dark-text-primary mb-4">
            {t.home.uploadTitle}
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            {t.home.uploadSubtitle}
          </p>
        </div>

        <div className="bg-bg-secondary dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-border-primary dark:border-dark-border-primary p-8 sm:p-12">
          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onClearImage={handleClearImage}
          />

          {error && (
            <div className="mt-6 p-4 bg-error-bg dark:bg-dark-error-bg border border-error-border dark:border-dark-error-border rounded-lg">
              <p className="text-error-text dark:text-dark-error-text text-sm">{error}</p>
            </div>
          )}

          {selectedImage && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="cursor-pointer inline-flex items-center space-x-3 px-8 py-4 bg-button-primary-bg dark:bg-dark-button-primary-bg text-button-primary-text dark:text-dark-button-primary-text font-medium rounded-lg hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-5 w-5" />
                <span>{t.home.getStyleTip}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  )
}

export default UploadPage