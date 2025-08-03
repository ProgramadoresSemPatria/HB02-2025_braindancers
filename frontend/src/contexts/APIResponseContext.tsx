import { createContext, useContext, useState } from 'react'

type APIResponse = {
  colors: string[]
  suggestion: string
  why: string
  identified_clothes: string[]
}

type ContextType = {
  result: APIResponse | null
  setResult: (data: APIResponse) => void
}

const APIResponseContext = createContext<ContextType | undefined>(undefined)

export const APIProvider = ({ children }: { children: React.ReactNode }) => {
  const [result, setResult] = useState<APIResponse | null>(null)
  return (
    <APIResponseContext.Provider value={{ result, setResult }}>
      {children}
    </APIResponseContext.Provider>
  )
}

export const useAPIResponse = () => {
  const context = useContext(APIResponseContext)
  if (!context) {
    throw new Error('useAPIResponse must be used within GeminiResponseProvider')
  }
  return context
}