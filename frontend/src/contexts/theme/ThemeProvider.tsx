import { useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<"light" | "dark" | "system">("system")
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system"
        const initialTheme = savedTheme || "system"
        setThemeState(initialTheme)
    }, [])
    
    useEffect(() => {
        const updateTheme = () => {
            const root = document.documentElement
            if(theme === "system") {
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                setIsDark(systemDark)
                root.classList.toggle("dark", systemDark)
            } else {
                const isDarkMode = theme === "dark"
                setIsDark(isDarkMode)
                root.classList.toggle("dark", isDarkMode)
            }
        }
        updateTheme()

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => {
            if(theme === "system") {
                updateTheme()
            }
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    const setTheme = (newTheme: "light" | "dark" | "system") => {
        setThemeState(newTheme)
        localStorage.setItem("theme", newTheme)
    }
    
    return (
        <ThemeContext.Provider value={{theme, setTheme, isDark}}>
            {children}
        </ThemeContext.Provider>
    )
}
