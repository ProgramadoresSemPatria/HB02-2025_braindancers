export type APIResponse = {
  colors: string[]
  suggestion: string
  why: string
  identified_clothes: string[]
}

export interface UploadResponse {
  success: boolean
  data?: APIResponse
  error?: string
}
