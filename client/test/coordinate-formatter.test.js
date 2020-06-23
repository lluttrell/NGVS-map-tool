import { hms_formatter, dms_formatter, decimal_dec_formatter, decimal_ra_formatter } from '../src/coordinate-formatter.js'

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

describe('test dms_formatter', () => {
  test('test valid value 1', () => expect(dms_formatter(82)).toBe("82:00:00"))
  test('test valid value 2', () => expect(dms_formatter(82.123)).toBe("82:07:22"))
  test('test precision', () => expect(dms_formatter(82.123,1)).toBe("82:07:22.8"))
  test('test out of bounds', () => {
    expect(() => {
      dms_formatter(-91)
    }).toThrow(RangeError)
  })
})

describe('test hms_formatter', () => {
  test('test valid value 1', () => expect(hms_formatter(180.000)).toBe('12:00:00'))
  test('test valid value 2 ', () => expect(hms_formatter(232.645)).toBe('15:30:34'))
  test('test precision', () => expect(hms_formatter(180.000, 2)).toBe('12:00:00.00'))
  test('test valid negative value', () => expect(hms_formatter(-7)).toBe('12:28:00'))
  test('test out of bounds', () => {
    expect(() => {
      hms_formatter(-180)
    }).toThrow(RangeError)
  })
})
