import { Brain, BookOpen, Zap } from "lucide-react"
import { useI18n } from "../contexts/i18nContext"
import { FeatureCard } from "./FeatureCard"

export function Features() {
  const { t } = useI18n()

  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{t.features.title}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brain}
            title={t.features.quizGenerator.title}
            description={t.features.quizGenerator.description}
            gradient="from-purple-500"
          />

          <FeatureCard
            icon={BookOpen}
            title={t.features.conceptSimplifier.title}
            description={t.features.conceptSimplifier.description}
            gradient="from-purple-500"
          />

          <FeatureCard
            icon={Zap}
            title={t.features.flashcardsPlus.title}
            description={t.features.flashcardsPlus.description}
            gradient="from-purple-700"
          />
        </div>
      </div>
    </section>
  )
}
