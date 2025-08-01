import { Brain, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../contexts/i18nContext'
import { LanguageSelector } from './LanguageSelector'
import { Link } from 'react-router-dom'

export function Header() {
  const { t } = useI18n()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-4 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto relative">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">Feynman</span>
        </div>

        <div className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
          <button
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => scrollToSection('#features')}
          >
            {t.nav.features}
          </button>
          <button
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => scrollToSection('#contact')}
          >
            {t.nav.contact}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <LanguageSelector />
          <Link
            to="/sign-in"
            className="text-gray-300 hover:text-white transition-colors px-2 py-1 text-left cursor-pointer"
          >
            <button className="cursor-pointer bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 rounded-full text-white font-medium hover:from-purple-700 hover:to-purple-900 transition-all">
              {t.nav.getStarted} →
            </button>
          </Link>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <LanguageSelector />
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white transition-colors z-50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-gray-700 shadow-lg z-50">
          <div className="flex flex-col space-y-4 p-6">
            <button
              className="text-gray-300 hover:text-white transition-colors px-2 py-1 text-left cursor-pointer"
              onClick={() => scrollToSection('#features')}
            >
              {t.nav.features}
            </button>
            <button
              className="text-gray-300 hover:text-white transition-colors px-2 py-1 text-left cursor-pointer"
              onClick={() => scrollToSection('#contact')}
            >
              {t.nav.contact}
            </button>

            <Link
              to="/sign-in"
              className="text-gray-300 hover:text-white transition-colors px-2 py-1 text-left cursor-pointer"
            >
              <button
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 rounded-full text-white font-medium hover:from-purple-700 hover:to-purple-900 transition-all w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.getStarted} →
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
