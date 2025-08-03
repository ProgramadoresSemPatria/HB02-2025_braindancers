import React, { useState, useRef, useCallback } from 'react'
import { useI18n } from '../contexts/i18nContext'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  selectedImage: File | null
  onClearImage: () => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
  onClearImage,
}) => {
  const { t } = useI18n()
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        onImageSelect(files[0])
      }
    },
    [onImageSelect],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onImageSelect(files[0])
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  if (selectedImage) {
    return (
      <div className="relative">
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected outfit"
            className="w-full max-h-96 object-contain"
          />
          <button
            onClick={onClearImage}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">{selectedImage.name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200
          ${
            isDragOver
              ? 'border-gray-400 bg-gray-50'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <Upload className="h-8 w-8 text-gray-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.home.dragDrop}
            </h3>
            <p className="text-sm text-gray-500">{t.home.supportedFormats}</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleBrowseClick}
              className="cursor-pointer flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ImageIcon className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {t.home.browse}
              </span>
            </button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}

export default ImageUpload
