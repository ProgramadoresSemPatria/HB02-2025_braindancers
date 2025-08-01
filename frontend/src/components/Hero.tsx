import { Brain } from 'lucide-react'
import { useI18n } from '../contexts/i18nContext'
import { Link } from 'react-router-dom'

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="px-6 py-24 lg:pt-28 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
          {t.hero.title}
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="relative mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-900 rounded-full flex items-center justify-center mx-auto relative">
            <Brain className="w-16 h-16 text-white" />

            <div className="absolute -top-4 -left-4 w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="absolute -top-2 -right-6 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-4 left-6 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="absolute top-8 -left-8 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-8 -right-8 w-3 h-3 bg-teal-400 rounded-full"></div>
          </div>
        </div>

        <Link
          to="/sign-in"
          className="text-gray-300 hover:text-white transition-colors px-2 py-1 text-left cursor-pointer"
        >
          <button className="cursor-pointer bg-gradient-to-r from-purple-800 to-pink-800 px-8 py-4 rounded-full text-white font-medium text-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            {t.hero.cta} →
          </button>
        </Link>
      </div>
    </section>
  )
}
