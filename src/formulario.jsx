import { useState } from 'react'
import { validatePattern, validateText } from './lib/karpRabin.js'

export default function Formulario({ onGenerate }) {
  const [pattern, setPattern] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const length = Array.from(pattern).length

  function handleSubmit(event) {
    event.preventDefault()
    const patternError = validatePattern(pattern)
    const textError = validateText(text, pattern)
    setErrors({ pattern: patternError, text: textError })
    if (!patternError && !textError) onGenerate(pattern, text)
  }

  return (
    <section className="panel pattern-panel" aria-labelledby="pattern-heading">
      <h2 id="pattern-heading">Datos de búsqueda</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="pattern">Patrón a buscar</label>
        <div className={`input-wrap${errors.pattern ? ' input-wrap--error' : ''}`}>
          <input id="pattern" name="pattern" type="text" value={pattern} placeholder="Ej. abc"
            autoComplete="off" spellCheck={false} aria-invalid={Boolean(errors.pattern)}
            aria-describedby={errors.pattern ? 'pattern-hint pattern-error' : 'pattern-hint'}
            onChange={(event) => { setPattern(event.target.value); setErrors({}) }} />
          <span className={length > 5 ? 'character-count character-count--error' : 'character-count'} aria-hidden="true">{length}/5</span>
        </div>
        <p id="pattern-hint" className="field-hint">De 2 a 5 caracteres · distingue mayúsculas y minúsculas.</p>
        {errors.pattern && <p id="pattern-error" className="field-error" role="alert">{errors.pattern}</p>}
        <label className="text-label" htmlFor="search-text">Cadena de texto</label>
        <div className={`input-wrap${errors.text ? ' input-wrap--error' : ''}`}>
          <input id="search-text" name="search-text" type="text" value={text} placeholder="Ej. abcabc"
            autoComplete="off" spellCheck={false} aria-invalid={Boolean(errors.text)}
            aria-describedby={errors.text ? 'text-hint text-error' : 'text-hint'}
            onChange={(event) => { setText(event.target.value); setErrors({}) }} />
        </div>
        <p id="text-hint" className="field-hint">Escribe la cadena en la que deseas buscar el patrón.</p>
        {errors.text && <p id="text-error" className="field-error" role="alert">{errors.text}</p>}
        <button className="button button--primary start-button" type="submit">Iniciar simulación</button>
      </form>
    </section>
  )
}
