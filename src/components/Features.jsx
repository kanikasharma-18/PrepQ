import {
  Target,
  CalendarCheck,
  Gauge,
  Compass,
  GitBranch,
  LineChart,
} from 'lucide-react'
import FeatureCard from './FeatureCard.jsx'

const features = [
  {
    icon: Target,
    title: 'AI Priority Engine',
    description: 'Know exactly what to work on next.',
  },
  {
    icon: CalendarCheck,
    title: 'Personalized Growth Plan',
    description: 'Daily and weekly plans based on your goals.',
  },
  {
    icon: Gauge,
    title: 'Goal Gap Analysis',
    description: 'Measure how far you are from your target.',
  },
  {
    icon: Compass,
    title: 'Focus Drift Detection',
    description: 'Detect when your effort is moving away from your goals.',
  },
  {
    icon: GitBranch,
    title: 'GitHub & LeetCode Tracking',
    description: 'Automatically sync your coding activity.',
  },
  {
    icon: LineChart,
    title: 'Weekly Performance Review',
    description: 'Receive actionable weekly insights.',
  },
]

function Features() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} index={index} {...feature} />
        ))}
      </div>
    </section>
  )
}

export default Features