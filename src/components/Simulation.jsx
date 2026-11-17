import SequenceView from './SequenceView.jsx'

function StepMessage({ simulation, current }) {
  if (!simulation) return null

  let message = 'Cadena lista para iniciar.'
  let tone = ''

  if (simulation.status !== 'ready' && !current) {
    message = `El hash del patrón “${simulation.pattern}” es ${simulation.patternHash}.`
  } else if (current?.isMatch) {
    message = `Se ha encontrado una coincidencia: “${current.substring}” es igual a “${simulation.pattern}”.`
    tone = ' step-message--match'
  } else if (current?.isCollision) {
    message = `Colisión: los hashes coinciden, pero “${current.substring}” no es igual a “${simulation.pattern}”.`
    tone = ' step-message--collision'
  } else if (current) {
    message = `“${current.substring}” no es igual a “${simulation.pattern}”.`
  }

  return <p className={`step-message${tone}`} role="status" aria-live="polite" aria-atomic="true">{message}</p>
}

export default function Simulation({ simulation, onNext, onRestart }) {
  const current = simulation?.history.at(-1)
  const complete = simulation?.status === 'complete'
  const step = simulation ? simulation.history.length + (simulation.patternHash !== null ? 1 : 0) : 0
  const totalSteps = simulation ? simulation.windowCount + 1 : 0

  return (
    <section className="panel simulation-panel" aria-labelledby="simulation-heading">
      <div className="simulation-heading">
        <h2 id="simulation-heading">Cadena generada</h2>
        <span className={`pill${complete ? ' pill--complete' : ''}`}>{complete ? 'Completado' : simulation ? '30 caracteres' : 'Sin generar'}</span>
      </div>

      {simulation ? <SequenceView simulation={simulation} /> : (
        <p className="empty-sequence">Genera una cadena para comenzar.</p>
      )}

      {simulation && (
        <div className="hash-comparison">
          <div className="hash-card">
            <span className="hash-label">Patrón</span>
            <code className="hash-word">{simulation.pattern}</code>
            <div className="hash-value"><span>Hash</span><strong>{simulation.patternHash ?? '—'}</strong></div>
          </div>
          <span className="comparison-sign" aria-label={current ? current.hashMatches ? 'Hashes iguales' : 'Hashes distintos' : 'Sin comparar'}>
            {current ? current.hashMatches ? '=' : '≠' : '?'}
          </span>
          <div className={`hash-card${current?.isMatch ? ' hash-card--match' : ''}`}>
            <span className="hash-label">{current ? `Ventana · índice ${current.index}` : 'Ventana actual'}</span>
            <code className="hash-word">{current?.substring ?? '—'}</code>
            <div className="hash-value"><span>Hash</span><strong>{current?.hash ?? '—'}</strong></div>
          </div>
        </div>
      )}

      <StepMessage simulation={simulation} current={current} />

      <div className="simulation-controls">
        <div className="progress-info">
          <span>{simulation ? `Paso ${step} de ${totalSteps}` : 'Paso 0'}</span>
          <progress aria-label="Progreso de la simulación" value={step} max={totalSteps || 1} />
        </div>
        <div className="control-buttons">
          {simulation && <button className="button button--secondary" type="button" onClick={onRestart}>Reiniciar recorrido</button>}
          <button className="button button--primary button--next" type="button" disabled={!simulation || complete} onClick={onNext}>
            Siguiente paso <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {complete && (
        <section className="final-result" role="status" aria-live="polite" aria-labelledby="result-heading">
          <div>
            <h3 id="result-heading">Recorrido completado</h3>
            <p>La cantidad de coincidencias de la cadena {simulation.pattern} es de {simulation.matchIndexes.length} veces.</p>
          </div>
        </section>
      )}
    </section>
  )
}
