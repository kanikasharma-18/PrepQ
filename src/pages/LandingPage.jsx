import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import DashboardPreview from '../components/DashboardPreview.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage