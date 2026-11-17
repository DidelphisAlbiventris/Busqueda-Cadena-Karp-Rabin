export const TEXT_LENGTH = 30
export const MIN_PATTERN_LENGTH = 2
export const MAX_PATTERN_LENGTH = 4
export const HASH_BASE = 256
export const HASH_MODULUS = 101

export function validatePattern(pattern) {
  const length = Array.from(pattern).length

  if (length < MIN_PATTERN_LENGTH || length > MAX_PATTERN_LENGTH) {
    return 'Escribe una cadena de entre 2 y 4 caracteres.'
  }

  return ''
}

export function generateText(pattern, random = Math.random) {
  const error = validatePattern(pattern)
  if (error) throw new RangeError(error)

  const patternCharacters = Array.from(pattern)
  const alphabet = [...new Set(patternCharacters)]
  const characters = Array.from(
    { length: TEXT_LENGTH },
    () => alphabet[Math.floor(random() * alphabet.length)],
  )
  const insertionIndex = Math.floor(random() * (TEXT_LENGTH - patternCharacters.length + 1))

  characters.splice(insertionIndex, patternCharacters.length, ...patternCharacters)
  return characters.join('')
}

export function calculateHash(value) {
  return Array.from(value).reduce(
    (hash, character) => (hash * HASH_BASE + character.codePointAt(0)) % HASH_MODULUS,
    0,
  )
}

function modulo(value) {
  return ((value % HASH_MODULUS) + HASH_MODULUS) % HASH_MODULUS
}

export function createSimulation(pattern, text = generateText(pattern)) {
  const error = validatePattern(pattern)
  if (error) throw new RangeError(error)

  const characters = Array.from(text)
  const patternLength = Array.from(pattern).length
  if (characters.length < patternLength) {
    throw new RangeError('La cadena generada no puede ser más corta que el patrón.')
  }

  let highestPower = 1
  for (let index = 1; index < patternLength; index += 1) {
    highestPower = (highestPower * HASH_BASE) % HASH_MODULUS
  }

  return {
    pattern,
    text,
    characters,
    patternLength,
    highestPower,
    windowCount: characters.length - patternLength + 1,
    patternHash: null,
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
