import LandingPage from './pages/LandingPage.jsx'
import DotField from './components/DotField.jsx'
import './App.css'

function App() {
  return (
    <>
      {/* DotField — fixed full-viewport dot grid, sibling of LandingPage so it
          is never clipped by LandingPage's overflow-hidden or its background */}
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

      <LandingPage />
    </>
  )
}

export default App