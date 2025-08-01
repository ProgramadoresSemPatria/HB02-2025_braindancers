export type Language = 'pt' | 'en'

export interface Translations {
  nav: {
    features: string
    about: string
    contact: string
    getStarted: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  features: {
    title: string
    quizGenerator: {
      title: string
      description: string
    }
    conceptSimplifier: {
      title: string
      description: string
    }
    flashcardsPlus: {
      title: string
      description: string
    }
  }
  footer: {
    description: string
    copyright: string
  }
}
