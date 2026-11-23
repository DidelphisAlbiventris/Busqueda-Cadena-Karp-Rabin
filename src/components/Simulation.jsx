import SequenceView from './SequenceView.jsx'
import HashDetails from './HashDetails.jsx'

export default function Simulation({ simulation, onNext, onRestart, isPlaying, onTogglePlay }) {
  const current = simulation?.history.at(-1)
  const complete = simulation?.status === 'complete'
  const step = simulation ? simulation.history.length + (simulation.patternHash !== null ? 1 : 0) : 0
  const totalSteps = simulation ? simulation.windowCount + 1 : 0

  return (
    <section className="panel simulation-panel" aria-labelledby="simulation-heading">
      <div className="simulation-heading">
        <h2 id="simulation-heading">Cadena de texto</h2>
        <span className={`pill${complete ? ' pill--complete' : ''}`}>{complete ? 'Completado' : simulation ? `${simulation.characters.length} caracteres` : 'Sin iniciar'}</span>
      </div>

      {simulation ? <SequenceView simulation={simulation} /> : (
        <p className="empty-sequence">Introduce el patrón y la cadena de texto para comenzar.</p>
      )}

      {simulation && (
        <div className="hash-comparison">
          <div className="hash-card">
            <span className="hash-label">Patrón</span>
            <code className="hash-word">{simulation.pattern}</code>
            <div className="hash-value"><span>Hash</span><strong>{simulation.patternHash === null ? '—' : String(simulation.patternHash)}</strong></div>
          </div>
          <span className="comparison-sign" aria-label={current ? current.hashMatches ? 'Hashes iguales' : 'Hashes distintos' : 'Sin comparar'}>
            {current ? current.hashMatches ? '=' : '≠' : '?'}
          </span>
          <div className={`hash-card${current?.isMatch ? ' hash-card--match' : current?.isCollision ? ' hash-card--collision' : ''}`}>
            <span className="hash-label">{current ? `Ventana · índice ${current.index}` : 'Ventana actual'}</span>
            <code className="hash-word">{current?.substring ?? '—'}</code>
            <div className="hash-value"><span>Hash</span><strong>{current ? String(current.hash) : '—'}</strong></div>
          </div>
        </div>
      )}

      <div className="simulation-controls">
        <div className="progress-info">
          <span>{simulation ? `Paso ${step} de ${totalSteps}` : 'Paso 0'}</span>
          <progress aria-label="Progreso de la simulación" value={step} max={totalSteps || 1} />
        </div>
        <div className="control-buttons">
          {simulation && <button className="button button--secondary" type="button" onClick={onRestart}>Reiniciar recorrido</button>}
          <button className="button button--secondary" type="button" disabled={!simulation || complete} onClick={onTogglePlay} aria-pressed={isPlaying}>
            {isPlaying ? 'Pausar reproducción' : 'Reproducir automáticamente'}
          </button>
          <button className="button button--primary button--next" type="button" disabled={!simulation || complete} onClick={onNext}>
            Siguiente paso <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {simulation && <HashDetails simulation={simulation} />}

      {complete && (
        <section className="final-result" role="status" aria-live="polite" aria-labelledby="result-heading">
          <div>
            <h3 id="result-heading">Recorrido completado</h3>
            <p>{simulation.matchIndexes.length
              ? `Posiciones de inicio de “${simulation.pattern}”: ${simulation.matchIndexes.join(', ')} (índices desde 0).`
              : `No se encontraron coincidencias de “${simulation.pattern}”.`}</p>
          </div>
        </section>
      )}
    </section>
  )
}
