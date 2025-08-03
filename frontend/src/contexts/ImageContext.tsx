import { createContext, useContext, useState, type ReactNode } from 'react'

type ImageContextType = {
  image: File | null
  setImage: (file: File | null) => void
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider')
  }
  return context
}

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<File | null>(null)

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  )
}