import test from 'node:test'
import assert from 'node:assert/strict'
import {
  TEXT_LENGTH,
  advanceSimulation,
  calculateHash,
  calculateHashSteps,
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
    assert.ok(steps <= simulation.windowCount + 1)
  }
  return simulation
}

test('validates patterns and supports Unicode', () => {
  for (const invalid of ['', 'a', 'abcdef', '😀']) assert.notEqual(validatePattern(invalid), '')
  for (const valid of ['ab', 'abc', 'abcd', '😀a', 'ñá', 'a ']) assert.equal(validatePattern(valid), '')
  assert.throws(() => generateText('a'), RangeError)
  assert.throws(() => createSimulation('ab', 'a'), RangeError)
})

test('generates exactly 30 characters with a guaranteed occurrence', () => {
  for (const pattern of ['ab', 'abc', 'abcd', 'aa', '😀ñ', 'a ']) {
    for (const sample of [0, 0.25, 0.7, 0.999999]) {
      const text = generateText(pattern, () => sample)
      assert.equal(Array.from(text).length, TEXT_LENGTH)
      assert.ok(text.includes(pattern))
    }
  }
})

test('the first click calculates only the pattern hash and its process', () => {
  const initial = createSimulation('ab', 'ababa')
  const first = advanceSimulation(initial)
  assert.equal(initial.patternHash, null)
  assert.equal(first.patternHash, calculateHash('ab'))
  assert.equal(first.patternHashSteps.length, 2)
  assert.deepEqual(first.history, [])
  const second = advanceSimulation(first)
  assert.equal(second.history[0].isMatch, true)
  assert.equal(second.history[0].hashSteps.length, 2)
})

test('compares every window and stores the starting indexes of overlapping occurrences', () => {
  for (const pattern of ['aa', 'aaa', 'aaaa']) {
    const simulation = finish(pattern, 'a'.repeat(TEXT_LENGTH))
    const expectedCount = TEXT_LENGTH - pattern.length + 1
    assert.equal(simulation.history.length, expectedCount)
    assert.deepEqual(simulation.matchIndexes, Array.from({ length: expectedCount }, (_, index) => index))
    assert.equal(advanceSimulation(simulation), simulation)
  }
})

test('rolling hashes equal a fresh hash for every window', () => {
  for (const [pattern, text] of [['ab', 'zzazabbbazababzzab'], ['abc', 'abccbaabccbacabc'], ['😀a', 'ñ😀aa😀a😀😀ab😀a']]) {
    const simulation = finish(pattern, text)
    for (const comparison of simulation.history) {
      assert.equal(comparison.hash, calculateHash(comparison.substring))
      assert.equal(comparison.hashSteps.at(-1).hash, comparison.hash)
    }
  }
})

test('uses the classic polynomial hash with base 256 and modulus 101', () => {
  const expected = (65 * (256 ** 2) + 66 * 256 + 67) % 101
  assert.equal(calculateHash('ABC'), expected)
  assert.deepEqual(calculateHashSteps('ABC').map((step) => step.exponent), [2, 1, 0])
  assert.deepEqual(calculateHashSteps('ABC').map((step) => step.hash), [64, 93, expected])
})

test('equal hashes with different characters are collisions, not matches', () => {
  assert.equal(calculateHash('ab'), calculateHash('b,'))
  const simulation = finish('ab', 'b,ab')
  assert.equal(simulation.history[0].isCollision, true)
  assert.equal(simulation.history[0].isMatch, false)
  assert.deepEqual(simulation.matchIndexes, [2])
})

test('search is case-sensitive and restart clears progress', () => {
  assert.deepEqual(finish('Ab', 'abAb').matchIndexes, [2])
  assert.deepEqual(finish('ab', 'cccc').matchIndexes, [])
  const completed = finish('ab', 'ababa')
  const restarted = createSimulation(completed.pattern, completed.text)
  assert.equal(restarted.patternHash, null)
  assert.deepEqual(restarted.history, [])
  assert.deepEqual(restarted.matchIndexes, [])
})
