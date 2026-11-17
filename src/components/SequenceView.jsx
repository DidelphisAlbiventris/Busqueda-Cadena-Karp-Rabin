export function displayCharacter(character) {
  return character === ' ' ? '␣' : character
}

export default function SequenceView({ simulation }) {
  const current = simulation.history.at(-1)

  return (
    <div className="sequence-view">
      <code className="sr-only" aria-label="Cadena completa">{simulation.text}</code>
      <ol className="sequence-grid" aria-label="Caracteres de la cadena generada" start={0}>
        {simulation.characters.map((character, index) => {
          const active = current && index >= current.index && index < current.index + simulation.patternLength
          const matched = simulation.matchIndexes.some(
            (start) => index >= start && index < start + simulation.patternLength,
          )
          const classes = ['character-cell', active && 'character-cell--active', matched && 'character-cell--matched']
            .filter(Boolean).join(' ')

          return (
            <li key={index} className={classes} aria-label={`Índice ${index}: ${character === ' ' ? 'espacio' : character}`}>
              <span className="character-value">{displayCharacter(character)}</span>
              <span className="character-index" aria-hidden="true">{index}</span>
            </li>
          )
        })}
      </ol>
      <div className="sequence-legend" aria-hidden="true">
        <span><i className="legend-dot legend-dot--active" /> Ventana actual</span>
        <span><i className="legend-dot legend-dot--matched" /> Coincidencia encontrada</span>
      </div>
    </div>
  )
}
