import { Link } from 'react-router-dom'
import { useI18n } from '../contexts/i18nContext'
import { Camera, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  const { t } = useI18n()

  return (
    <section>
      <motion.div
        initial={{ x: 30, scale: 1, opacity: 0.7 }}
        whileInView={{ x: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative overflow-hidden bg-white"
      >
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              {t.home.title}
              <br />
              <span className="font-normal">{t.home.subtitle}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              {t.home.description}
            </p>

            <Link to="/upload">
              <button
                type="button"
                className="inline-flex items-center space-x-3 px-8 py-4 cursor-pointer bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
              >
                <Camera className="h-5 w-5" />
                <span>{t.home.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.home.stepsCaptureTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.home.stepsCaptureDescription}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.home.stepsAnalyzeTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.home.stepsAnalyzeDescription}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.home.stepsElevateTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.home.stepsElevateDescription}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
