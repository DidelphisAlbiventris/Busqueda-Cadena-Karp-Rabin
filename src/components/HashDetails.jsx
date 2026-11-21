import { HASH_BASE, HASH_MODULUS } from '../lib/karpRabin.js'

function HashProcess({ title, steps }) {
  if (!steps?.length) return null

  return (
    <div className="hash-process">
      <strong>{title}</strong>
      <div className="hash-process-list">
        {steps.map((step, index) => (
          <div className="hash-process-row" key={step.position}>
            <code>({index ? steps[index - 1].hash : 0} + {step.codePoint} × {HASH_BASE}<sup>{step.exponent}</sup>) mod {HASH_MODULUS}</code>
            <span>→ {String(step.hash)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HashDetails({ simulation }) {
  const current = simulation?.history.at(-1)

  return (
    <section className="hash-details" aria-labelledby="hash-details-heading">
      <h3 id="hash-details-heading">Proceso de cálculo del hash</h3>
      <p>Cada carácter Cᵢ se representa con su código Unicode y se multiplica por la potencia de la base que corresponde a su posición:</p>
      <code className="hash-formula">xᵢ = (Cᵢ × Bᵐ⁻¹ + Cᵢ₊₁ × Bᵐ⁻² + … + Cᵢ₊ₘ₋₁) mod {HASH_MODULUS}, con B = {HASH_BASE}</code>
      <HashProcess title={`Cadena base: ${simulation?.pattern ?? '—'}`} steps={simulation?.patternHashSteps} />
      <HashProcess title={current ? `Ventana ${current.index}: ${current.substring}` : 'Ventana actual'} steps={current?.hashSteps} />
      {current && (
        <div className="hash-verdict" role="status" aria-live="polite" aria-atomic="true">
          <strong>Comparación de hashes: </strong>
          <code>{simulation.patternHash} {current.hashMatches ? '=' : '≠'} {current.hash}</code>
          <p>{current.isMatch
            ? `Coincidencia confirmada en la posición ${current.index}.`
            : current.isCollision
              ? 'Colisión: hashes iguales, pero caracteres distintos. No se guarda esta posición.'
              : 'Hashes distintos: se descarta esta posición.'}</p>
        </div>
      )}
      <p className="hash-note"><strong>Nota:</strong> dos cadenas distintas pueden producir el mismo hash. Por eso, cuando los hashes coinciden, también se comparan sus caracteres.</p>
    </section>
  )
}
