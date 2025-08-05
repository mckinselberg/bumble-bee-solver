import { describe, it, expect } from 'vitest'
import { getAllValidWords } from '../solver'

const dictionary = new Set(['abcd', 'abdc', 'badc', 'cabd', 'zzzz', 'aaaa'])

describe('getAllValidWords', () => {
  it('returns words containing the center letter only', () => {
    const letters = 'abcd'
    const result = getAllValidWords(letters, dictionary).sort()
    expect(result).toEqual(['abcd', 'abdc', 'badc', 'cabd'].sort())
  })

  it('ignores words not using only provided letters', () => {
    const letters = 'abcde'
    const dict = new Set(['abee', 'abce', 'aeee', 'abef'])
    const result = getAllValidWords(letters, dict).sort()
    expect(result).toEqual(['abee', 'abce', 'aeee'].sort())
  })
})
