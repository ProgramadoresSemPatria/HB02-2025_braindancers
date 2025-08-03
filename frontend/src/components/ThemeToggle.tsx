import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getCurrentIcon = () => {
    if (theme === 'system') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return isSystemDark ? Moon : Sun
    }
    return theme === 'dark' ? Moon : Sun
  }

  const CurrentIcon = getCurrentIcon()

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 text-icon-primary dark:text-dark-icon-primary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors duration-200 rounded-full hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary"
        title="Toggle theme"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 360 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.3 
        }}
      >
        <CurrentIcon className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 top-full mt-2 bg-dropdown-bg dark:bg-dark-dropdown-bg rounded-lg shadow-lg border border-dropdown-border dark:border-dark-dropdown-border py-1 z-50 min-w-[80px]"
            initial={{ 
              opacity: 0, 
              y: -10, 
              scale: 0.95,
              rotateX: -15
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              y: -10, 
              scale: 0.95,
              rotateX: -15
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              duration: 0.4
            }}
          >
            <motion.button
              onClick={() => {
                setTheme('light')
                setIsOpen(false)
              }}
              className={`flex items-center justify-center w-full h-10 text-sm transition-all duration-200 ease-in-out ${
                theme === 'light' 
                  ? 'text-accent-primary dark:text-dark-accent-primary bg-accent-light dark:bg-dark-accent-light' 
                  : 'text-icon-primary dark:text-dark-icon-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
              }`}
              title="Light mode"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Sun className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => {
                setTheme('dark')
                setIsOpen(false)
              }}
              className={`flex items-center justify-center w-full h-10 text-sm transition-all duration-200 ease-in-out ${
                theme === 'dark' 
                  ? 'text-accent-primary dark:text-dark-accent-primary bg-accent-light dark:bg-dark-accent-light' 
                  : 'text-icon-primary dark:text-dark-icon-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
              }`}
              title="Dark mode"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Moon className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeToggle