import { useEffect, useRef } from 'react'
import './DotField.css'

export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 24,
  bulgeStrength = 60,
  glowRadius = 120,
  sparkle = false,
  waveAmplitude = 0,
  cursorRadius = 200,
  cursorForce = 0.15,
  bulgeOnly = false,
  gradientFrom = 'rgba(99,102,241,0.12)',
  gradientTo = 'rgba(99,102,241,0.05)',
  glowColor = 'rgba(99,102,241,0.18)',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let mouse = { x: -9999, y: -9999 }
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Background gradient
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, gradientFrom)
      grad.addColorStop(1, gradientTo)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Glow under cursor
      if (mouse.x > 0 && mouse.y > 0) {
        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, glowRadius
        )
        glow.addColorStop(0, glowColor)
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      // Dots
      const cols = Math.ceil(width / dotSpacing) + 1
      const rows = Math.ceil(height / dotSpacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = c * dotSpacing
          let y = r * dotSpacing

          // Wave
          if (waveAmplitude > 0) {
            y += Math.sin(c * 0.5 + time) * waveAmplitude
          }

          // Cursor bulge
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          let offsetX = 0
          let offsetY = 0
          let alpha = 0.35

          if (dist < cursorRadius) {
            const factor = (1 - dist / cursorRadius)
            const force = factor * bulgeStrength
            if (bulgeOnly) {
              offsetX = (dx / (dist || 1)) * force * cursorForce * 10
              offsetY = (dy / (dist || 1)) * force * cursorForce * 10
            } else {
              offsetX = -(dx / (dist || 1)) * force * cursorForce * 10
              offsetY = -(dy / (dist || 1)) * force * cursorForce * 10
            }
            alpha = 0.35 + factor * 0.45
          }

          // Sparkle
          let radius = dotRadius
          if (sparkle && dist < cursorRadius) {
            radius = dotRadius + Math.random() * 0.8
          }

          ctx.beginPath()
          ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(99,102,241,${alpha})`
          ctx.fill()
        }
      }

      time += 0.016
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [
    dotRadius, dotSpacing, bulgeStrength, glowRadius, sparkle,
    waveAmplitude, cursorRadius, cursorForce, bulgeOnly,
    gradientFrom, gradientTo, glowColor,
  ])

  return <canvas ref={canvasRef} className="dot-field-canvas" />
}
