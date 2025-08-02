import React, { useState } from 'react'
import { useI18n } from '../contexts/i18nContext'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../components/ImageUpload'
import LoadingSpinner from '../components/LoadSpinner'
import type { AnalysisResult } from '../types/ai-response'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Hero } from '../components/Hero'

const HomePage: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
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

      // Mock API call - replace with actual endpoint
      const response = await new Promise<AnalysisResult>((resolve) => {
        setTimeout(() => {
          resolve({
            detectedItems: [
              { name: 'White T-shirt', confidence: 0.95, category: 'Top' },
              { name: 'Blue Jeans', confidence: 0.88, category: 'Bottom' },
              { name: 'Sneakers', confidence: 0.92, category: 'Footwear' },
            ],
            colors: [
              { name: 'White', hex: '#FFFFFF', percentage: 45 },
              { name: 'Blue', hex: '#4A90E2', percentage: 35 },
              { name: 'Black', hex: '#000000', percentage: 20 },
            ],
            styleTip: {
              suggestion:
                'This classic casual look is perfect for everyday wear! Consider adding a denim jacket or blazer for a more polished appearance.',
              why: 'The combination of white and blue creates a clean, timeless aesthetic that works well for most body types and occasions. The neutral palette makes it easy to accessorize.',
            },
            imageUrl: URL.createObjectURL(selectedImage),
          })
        }, 2000)
      })

      // Navigate to results page with data
      navigate('/result', { state: { result: response } })
    } catch (err) {
      setError(t.errors.uploadError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {isLoading && <LoadingSpinner />}

      <Hero />

      <div className="py-24 bg-white">
        <div id="upload-section" className="py-24 mt-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                {t.home.uploadTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.home.uploadSubtitle}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
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
                    className="curspo inline-flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>{t.home.getStyleTip}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
