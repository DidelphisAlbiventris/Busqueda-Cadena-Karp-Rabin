import { useState } from 'react'
import Formulario from './formulario.jsx'
import Simulation from './components/Simulation.jsx'
import ComparisonLog from './components/ComparisonLog.jsx'
import { advanceSimulation, createSimulation } from './lib/karpRabin.js'
import universityLogo from './assets/logo.png'

export default function App() {
  const [simulation, setSimulation] = useState(null)

  function handleGenerate(pattern) {
    setSimulation(createSimulation(pattern))
  }

  function handleNext() {
    setSimulation((current) => current ? advanceSimulation(current) : current)
  }

  function handleRestart() {
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
            <h2 id="count-heading">Coincidencias</h2>
            <p className="count-value" aria-live="polite" aria-atomic="true">
              <span className="sr-only">Coincidencias encontradas: </span>
              {simulation?.matchIndexes.length ?? 0}
            </p>
          </section>
          <Simulation simulation={simulation} onNext={handleNext} onRestart={handleRestart} />
        </div>
        <ComparisonLog history={simulation?.history ?? []} />
      </main>

      <footer className="site-footer">Aplicación web educativa para el curso Análisis de Algoritmos · compatible con GitHub Pages</footer>
    </div>
  )
}
