import { useEffect, useState } from 'react'
import Formulario from './formulario.jsx'
import Simulation from './components/Simulation.jsx'
import ComparisonLog from './components/ComparisonLog.jsx'
import { advanceSimulation, createSimulation } from './lib/karpRabin.js'
import universityLogo from './assets/logo.png'

export default function App() {
  const [simulation, setSimulation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying || !simulation || simulation.status === 'complete') return

    const timer = setTimeout(() => {
      setSimulation((current) => current ? advanceSimulation(current) : current)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isPlaying, simulation])

  useEffect(() => {
    if (simulation?.status === 'complete') setIsPlaying(false)
  }, [simulation?.status])

  function handleGenerate(pattern, text) {
    setIsPlaying(false)
    setSimulation(createSimulation(pattern, text))
  }

  function handleNext() {
    setIsPlaying(false)
    setSimulation((current) => current ? advanceSimulation(current) : current)
  }

  function handleRestart() {
    setIsPlaying(false)
    setSimulation((current) => current ? createSimulation(current.pattern, current.text) : current)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <img className="brand-logo" src={universityLogo} alt="Logo de la UFPS" width="56" height="56" />
          <span>Universidad Francisco<br />de Paula Santander</span>
        </div>
      </header>

      <main>
        <section className="intro" aria-labelledby="page-title">
          <h1 id="page-title">Simulador de búsqueda de cadena:<span>Método de Karp Rabin</span></h1>
          <p>El método compara el hash de un patrón con el de cada subcadena para encontrar coincidencias. Observa la búsqueda paso a paso.</p>
        </section>

        <div className="workspace">
          <Formulario onGenerate={handleGenerate} />
          <section className="panel count-panel" aria-labelledby="count-heading">
            <h2 id="count-heading">Posiciones encontradas</h2>
            <p className="count-value" aria-live="polite" aria-atomic="true">
              {simulation?.matchIndexes.length ? simulation.matchIndexes.join(', ') : '—'}
            </p>
            <p className="field-hint">Índices de inicio, desde 0.</p>
          </section>
          <Simulation simulation={simulation} onNext={handleNext} onRestart={handleRestart} isPlaying={isPlaying} onTogglePlay={() => setIsPlaying((current) => !current)} />
        </div>
        <ComparisonLog history={simulation?.history ?? []} />
      </main>

      <footer className="site-footer">
        <p><strong>Autores:</strong> Johan Alexis Barrera Vargas (1152538) · Joseer Sneider Carrillo Gónzalez (1152539)</p>
        <p><a href="mailto:johanalexisbv@ufps.edu.co">johanalexisbv@ufps.edu.co</a> · 2028</p>
        <p>Análisis de Algoritmos · Ingeniería de Sistemas · Universidad Francisco de Paula Santander</p>
        <p>Cúcuta, Norte de Santander, Colombia · Profesor: Ph.D. Marco Antonio Adarme Jaimes</p>
        <p><a href="https://github.com/DidelphisAlbiventris/Busqueda-Cadena-Karp-Rabin">Repositorio y documentación en GitHub</a></p>
      </footer>
    </div>
  )
}
