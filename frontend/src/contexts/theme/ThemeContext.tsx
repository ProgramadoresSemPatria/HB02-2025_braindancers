import { createContext } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    isDark: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
