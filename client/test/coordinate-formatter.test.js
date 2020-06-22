import { decimal_ra_formatter, decimal_dec_formatter } from '../src/coordinate-formatter.js'

describe('test decimal_ra_formatter', () => {
  test('test valid value', () => expect(decimal_ra_formatter(5.1234)).toBe('5.1234'))
  test('test rounding', () => expect(decimal_ra_formatter(5.1234567)).toBe('5.1235'))
  test('test precision', () => expect(decimal_ra_formatter(5.1234567,5)).toBe('5.12346'))
  test('test valid negative value', () => expect(decimal_ra_formatter(-5.1234)).toBe('185.1234'))
  test('test out of bounds', () => {
    expect(() => {
      decimal_ra_formatter(-180)
    }).toThrow(RangeError)
  })
})

describe('test decimal_dec_formatter', () => {
  test('test valid value', () => expect(decimal_dec_formatter(5.1234)).toBe('5.1234'))
  test('test rounding', () => expect(decimal_dec_formatter(5.1234567)).toBe('5.1235'))
  test('test precision', () => expect(decimal_dec_formatter(5.1234567,5)).toBe('5.12346'))
  test('test valid negative value', () => expect(decimal_dec_formatter(-5.1234)).toBe('-5.1234'))
  test('test out of bounds', () => {
    expect(() => {
      decimal_dec_formatter(91.0)
    }).toThrow(RangeError)
  })
})
