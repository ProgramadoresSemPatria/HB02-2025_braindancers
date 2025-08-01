import { Brain, Github, Twitter, Linkedin } from "lucide-react"
import { useI18n } from "../contexts/i18nContext"

export function Footer() {
  const { t } = useI18n()

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer id="contact" className="px-6 py-16 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-semibold">Feynman</span>
        </div>

        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          {t.footer.description}
        </p>

        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 text-sm text-gray-500">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}