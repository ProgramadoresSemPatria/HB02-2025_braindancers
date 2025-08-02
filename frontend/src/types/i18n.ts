export type Language = 'pt' | 'en'

export interface Translations {
  app: {
    name: string
    tagline: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    cta: string
    stepsCaptureTitle: string
    stepsCaptureDescription: string
    stepsAnalyzeTitle: string
    stepsAnalyzeDescription: string
    stepsElevateTitle: string
    stepsElevateDescription: string
    about: string
    howItWorks: string
    tryIt: string
    uploadTitle: string
    uploadSubtitle: string
    dragDrop: string
    or: string
    browse: string
    camera: string
    getStyleTip: string
    loading: string
    supportedFormats: string
  }
  result: {
    back: string
    yourOutfit: string
    detectedItems: string
    colors: string
    styleTip: string
    suggestion: string
    why: string
    tryAgain: string
    tipTitle: string
    tipContent: string
  },
  errors: {
    uploadError: string
    invalidFile: string
    networkError: string
  }
}