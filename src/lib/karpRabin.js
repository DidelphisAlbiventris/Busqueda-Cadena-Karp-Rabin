export const MIN_PATTERN_LENGTH = 2
export const MAX_PATTERN_LENGTH = 5
export const MIN_TEXT_LENGTH = 5
export const MAX_TEXT_LENGTH = 100
export const HASH_BASE = 256
export const HASH_MODULUS = 101

export function validatePattern(pattern) {
  const length = Array.from(pattern).length

  if (length < MIN_PATTERN_LENGTH || length > MAX_PATTERN_LENGTH) {
    return `Escribe una cadena de entre ${MIN_PATTERN_LENGTH} y ${MAX_PATTERN_LENGTH} caracteres.`
  }

  return ''
}

export function validateText(text, pattern) {
  const length = Array.from(text).length
  if (length < MIN_TEXT_LENGTH || length > MAX_TEXT_LENGTH) {
    return `La cadena principal debe tener entre ${MIN_TEXT_LENGTH} y ${MAX_TEXT_LENGTH} caracteres.`
  }
  if (length < Array.from(pattern).length) {
    return 'La cadena de texto debe tener al menos tantos caracteres como el patrón.'
  }
  return ''
}

export function calculateHashSteps(value) {
  const characters = Array.from(value)
  let hash = 0

  return characters.map((character, index) => {
    const codePoint = character.codePointAt(0)
    const exponent = characters.length - index - 1
    const power = modularPower(HASH_BASE, exponent)
    const term = (codePoint * power) % HASH_MODULUS
    hash = modulo(hash + term)

    return {
      character,
      position: index + 1,
      codePoint,
      exponent,
      power,
      term,
      hash,
    }
  })
}

export function calculateHash(value) {
  return calculateHashSteps(value).at(-1)?.hash ?? 0
}

function modulo(value) {
  return ((value % HASH_MODULUS) + HASH_MODULUS) % HASH_MODULUS
}

function modularPower(base, exponent) {
  let result = 1
  for (let index = 0; index < exponent; index += 1) {
    result = (result * base) % HASH_MODULUS
  }
  return result
}

export function createSimulation(pattern, text) {
  const error = validatePattern(pattern)
  if (error) throw new RangeError(error)

  if (typeof text !== 'string') throw new TypeError('Introduce la cadena de texto.')
  const textError = validateText(text, pattern)
  if (textError) throw new RangeError(textError)

  const characters = Array.from(text)
  const patternLength = Array.from(pattern).length
  const highestPower = modularPower(HASH_BASE, patternLength - 1)

  return {
    pattern,
    text,
    characters,
    patternLength,
    highestPower,
    windowCount: characters.length - patternLength + 1,
    patternHash: null,
    patternHashSteps: [],
    history: [],
    matchIndexes: [],
    status: 'ready',
  }
}

// Pure transitions keep each click to exactly one step, including in StrictMode.
export function advanceSimulation(simulation) {
  if (simulation.status === 'complete') return simulation

  if (simulation.status === 'ready') {
    return {
      ...simulation,
      patternHash: calculateHash(simulation.pattern),
      patternHashSteps: calculateHashSteps(simulation.pattern),
      status: 'searching',
    }
  }

  const index = simulation.history.length
  const previous = simulation.history.at(-1)
  const substring = simulation.characters.slice(index, index + simulation.patternLength).join('')
  const outgoing = index > 0 ? simulation.characters[index - 1] : null
  const incoming = simulation.characters[index + simulation.patternLength - 1]
  const hash = previous
    ? modulo(
      (previous.hash - outgoing.codePointAt(0) * simulation.highestPower) * HASH_BASE
        + incoming.codePointAt(0),
    )
    : calculateHash(substring)
  const hashMatches = hash === simulation.patternHash
  // A matching hash is only a candidate: collisions must not increase the count.
  const isMatch = hashMatches && substring === simulation.pattern
  const comparison = {
    index,
    substring,
    hash,
    hashSteps: calculateHashSteps(substring),
    hashMatches,
    isMatch,
    isCollision: hashMatches && !isMatch,
    outgoing,
    incoming,
    previousHash: previous?.hash ?? null,
  }

  return {
    ...simulation,
    history: [...simulation.history, comparison],
    matchIndexes: isMatch ? [...simulation.matchIndexes, index] : simulation.matchIndexes,
    status: index === simulation.windowCount - 1 ? 'complete' : 'searching',
  }
}
