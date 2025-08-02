export interface DetectedItem {
  name: string
  confidence: number
  category: string
}

export interface AnalysisResult {
  detectedItems: DetectedItem[]
  colors: string[]
  suggestion: string
  why: string
}

export interface UploadResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
}
