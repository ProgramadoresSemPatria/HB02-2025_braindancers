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
        <div className="relative bg-bg-primary dark:bg-dark-bg-primary rounded-2xl shadow-lg overflow-hidden">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected outfit"
            className="w-full max-h-96 object-contain"
          />
          <button
            onClick={onClearImage}
            className="absolute top-3 right-3 bg-bg-primary dark:bg-dark-bg-primary rounded-full p-2 shadow-lg hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
          >
            <X className="h-4 w-4 text-icon-primary dark:text-dark-icon-primary" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{selectedImage.name}</p>
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
              ? 'border-border-accent dark:border-dark-border-accent bg-upload-area-hover dark:bg-dark-upload-area-hover'
              : 'border-upload-area-border dark:border-dark-upload-area-border bg-upload-area-bg dark:bg-dark-upload-area-bg hover:border-border-accent dark:hover:border-dark-border-accent'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-bg-tertiary dark:bg-dark-bg-tertiary p-4 rounded-full">
            <Upload className="h-8 w-8 text-icon-primary dark:text-dark-icon-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
              {t.home.dragDrop}
            </h3>
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">{t.home.supportedFormats}</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleBrowseClick}
              className="cursor-pointer flex items-center space-x-2 px-6 py-3 bg-button-secondary-bg dark:bg-dark-button-secondary-bg border border-button-secondary-border dark:border-dark-button-secondary-border rounded-lg hover:bg-button-secondary-hover dark:hover:bg-dark-button-secondary-hover transition-colors"
            >
              <ImageIcon className="h-4 w-4 text-icon-primary dark:text-dark-icon-primary" />
              <span className="text-sm font-medium text-button-secondary-text dark:text-dark-button-secondary-text">
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
