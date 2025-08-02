export interface DetectedItem {
  name: string;
  confidence: number;
  category: string;
}

export interface DetectedColor {
  name: string;
  hex: string;
  percentage: number;
}

export interface StyleTip {
  suggestion: string;
  why: string;
}

export interface AnalysisResult {
  detectedItems: DetectedItem[];
  colors: DetectedColor[];
  styleTip: StyleTip;
  imageUrl: string;
}

export interface UploadResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}