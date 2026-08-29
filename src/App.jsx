import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import DashboardOverviewPage from './pages/DashboardOverviewPage.jsx'
import DotField from './components/DotField.jsx'
import './App.css'

function App() {
  return (
    <>
      {/* DotField — fixed full-viewport interactive dot background.
          Rendered on ALL routes including the dashboard.
          z-index 0 + pointer-events none ensures it never blocks clicks. */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <DotField
          dotRadius={1.3}
          dotSpacing={26}
          bulgeStrength={35}
          glowRadius={130}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={220}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(0, 0, 0, 0.10)"
          gradientTo="rgba(0, 0, 0, 0.05)"
          glowColor="rgba(0, 0, 0, 0.08)"
        />
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
      </Routes>
    </>
  )
}

export default App