import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = 'from-purple-500 to-pink-500',
}: FeatureCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center hover:bg-slate-800/70 transition-colors">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}
