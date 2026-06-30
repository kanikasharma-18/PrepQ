import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import DashboardPreview from '../components/DashboardPreview.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#08080a] text-neutral-900 dark:text-neutral-50 transition-colors duration-500 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.55] dark:opacity-[0.25] z-0" />
      
      {/* Subtle Indigo Blob at Top Left */}
      <div className="absolute top-[-10%] left-[-15%] w-[65%] h-[55%] rounded-full bg-accent-100/15 dark:bg-accent-950/[0.05] blur-[150px] pointer-events-none z-0" />
      
      {/* Subtle Violet/Purple Blob at Right Middle */}
      <div className="absolute top-[25%] right-[-10%] w-[55%] h-[45%] rounded-full bg-violet-100/12 dark:bg-violet-950/[0.04] blur-[150px] pointer-events-none z-0" />

      {/* Subtle Blue/Indigo Blob at Bottom Left */}
      <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[45%] rounded-full bg-blue-100/10 dark:bg-blue-950/[0.03] blur-[150px] pointer-events-none z-0" />
      
      {/* Soft Radial Gradient behind Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] max-w-[1400px] h-[800px] bg-[radial-gradient(ellipse_at_top,_rgba(120,124,248,0.08),_rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(120,124,248,0.03),_rgba(0,0,0,0)_65%)] pointer-events-none z-0" />

      <Navbar />
      <main className="relative z-10">
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