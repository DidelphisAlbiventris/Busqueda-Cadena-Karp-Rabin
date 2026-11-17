import { useState } from 'react'
import { validatePattern } from './lib/karpRabin.js'

export default function Formulario({ onGenerate }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const length = Array.from(text).length

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validatePattern(text)
    setError(validationError)
    if (!validationError) onGenerate(text)
  }

  return (
    <section className="panel pattern-panel" aria-labelledby="pattern-heading">
      <h2 id="pattern-heading"><label htmlFor="pattern">Cadena a buscar</label></h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-controls">
          <div className={`input-wrap${error ? ' input-wrap--error' : ''}`}>
            <input
              id="pattern"
              name="pattern"
              type="text"
              value={text}
              placeholder="Ej. abc"
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'pattern-hint pattern-error' : 'pattern-hint'}
              onChange={(event) => {
                setText(event.target.value)
                setError('')
              }}
            />
            <span className={length > 4 ? 'character-count character-count--error' : 'character-count'} aria-hidden="true">
              {length}/4
            </span>
          </div>
          <button className="button button--primary generate-button" type="submit">Generar cadena</button>
        </div>
        <p id="pattern-hint" className="field-hint">De 2 a 4 caracteres · distingue mayúsculas y minúsculas.</p>
        {error && <p id="pattern-error" className="field-error" role="alert">{error}</p>}
      </form>
    </section>
  )
}
