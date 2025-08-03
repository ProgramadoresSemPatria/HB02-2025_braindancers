import React, { useState } from 'react'
import { useI18n } from '../contexts/i18nContext'
import { useNavigate } from 'react-router-dom'
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

      const response = await fetch('http://localhost:9090/upload', {
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
    <main className="min-h-screen bg-white py-24 flex flex-col justify-center items-center">
      {isLoading && <LoadingSpinner />}

      <motion.div
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            {t.home.uploadTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.home.uploadSubtitle}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onClearImage={handleClearImage}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {selectedImage && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="cursor-pointer inline-flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
