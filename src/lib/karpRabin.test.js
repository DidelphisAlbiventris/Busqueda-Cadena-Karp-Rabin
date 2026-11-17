// Runtime validation coverage for: guaranteed text generation and step-by-step Karp–Rabin search.
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  TEXT_LENGTH,
  advanceSimulation,
  calculateHash,
  createSimulation,
  generateText,
  validatePattern,
} from './karpRabin.js'

function finish(pattern, text) {
  let simulation = createSimulation(pattern, text)
  let steps = 0
  while (simulation.status !== 'complete') {
    simulation = advanceSimulation(simulation)
    steps += 1
    assert.ok(steps <= simulation.windowCount + 1, 'The search must terminate after its last window.')
  }
  return simulation
}

test('accepts only patterns with 2–4 characters, including Unicode', () => {
  for (const invalid of ['', 'a', 'abcde', '😀']) assert.notEqual(validatePattern(invalid), '')
  for (const valid of ['ab', 'abc', 'abcd', '😀a', 'ñá', 'a ']) assert.equal(validatePattern(valid), '')
  assert.throws(() => generateText('a'), RangeError)
  assert.throws(() => createSimulation('ab', 'a'), RangeError)
})

test('generates exactly 30 characters with a guaranteed occurrence at either boundary', () => {
  for (const pattern of ['ab', 'abc', 'abcd', 'aa', '😀ñ', 'a ']) {
    for (const sample of [0, 0.25, 0.7, 0.999999]) {
      const text = generateText(pattern, () => sample)
      assert.equal(Array.from(text).length, TEXT_LENGTH)
      assert.ok(text.includes(pattern))
      assert.ok(Array.from(text).every((character) => Array.from(pattern).includes(character)))
    }
  }
  assert.ok(generateText('ab', () => 0).startsWith('ab'))
  assert.ok(generateText('ab', () => 0.999999).endsWith('ab'))
})

test('the first click only calculates the pattern hash and leaves the initial state unchanged', () => {
  const initial = createSimulation('ab', 'ababa')
  const first = advanceSimulation(initial)
  assert.equal(initial.patternHash, null)
  assert.equal(initial.status, 'ready')
  assert.equal(first.patternHash, calculateHash('ab'))
  assert.equal(first.status, 'searching')
  assert.deepEqual(first.history, [])
  assert.deepEqual(first.matchIndexes, [])
  const second = advanceSimulation(first)
  assert.equal(second.history.length, 1)
  assert.equal(second.history[0].index, 0)
  assert.equal(second.history[0].substring, 'ab')
  assert.equal(second.history[0].isMatch, true)
})

test('compares every window once and counts overlapping occurrences through the final index', () => {
  for (const pattern of ['aa', 'aaa', 'aaaa']) {
    const simulation = finish(pattern, 'a'.repeat(TEXT_LENGTH))
    const expectedCount = TEXT_LENGTH - pattern.length + 1
    assert.equal(simulation.history.length, expectedCount)
    assert.equal(simulation.matchIndexes.length, expectedCount)
    assert.equal(simulation.matchIndexes.at(-1), TEXT_LENGTH - pattern.length)
    assert.equal(advanceSimulation(simulation), simulation)
  }
})

test('rolling hashes equal a fresh hash for every window, including non-ASCII text', () => {
  for (const [pattern, text] of [
    ['ab', 'zzazabbbazababzzab'],
    ['abc', 'abccbaabccbacabc'],
    ['abcd', 'ddcbabcdadcbaabcd'],
    ['😀a', 'ñ😀aa😀a😀😀ab😀a'],
    ['a ', ' a  a ab a '],
  ]) {
    const simulation = finish(pattern, text)
    for (const comparison of simulation.history) {
      assert.equal(comparison.hash, calculateHash(comparison.substring))
      assert.ok(comparison.hash >= 0 && comparison.hash < 101)
    }
    const expected = []
    const characters = Array.from(text)
    const size = Array.from(pattern).length
    for (let index = 0; index <= characters.length - size; index += 1) {
      if (characters.slice(index, index + size).join('') === pattern) expected.push(index)
    }
    assert.deepEqual(simulation.matchIndexes, expected)
  }
})

test('equal hashes with different characters are collisions, not matches', () => {
  assert.equal(calculateHash('ab'), calculateHash('b,'))
  const simulation = finish('ab', 'b,ab')
  assert.equal(simulation.history[0].isCollision, true)
  assert.equal(simulation.history[0].isMatch, false)
  assert.deepEqual(simulation.matchIndexes, [2])
})

test('search is case-sensitive, can report zero matches, and a restart clears all progress', () => {
  assert.deepEqual(finish('Ab', 'abAb').matchIndexes, [2])
  assert.deepEqual(finish('ab', 'cccc').matchIndexes, [])
  const completed = finish('ab', 'ababa')
  const restarted = createSimulation(completed.pattern, completed.text)
  assert.equal(restarted.text, completed.text)
  assert.equal(restarted.status, 'ready')
  assert.equal(restarted.patternHash, null)
  assert.deepEqual(restarted.history, [])
  assert.deepEqual(restarted.matchIndexes, [])
})
