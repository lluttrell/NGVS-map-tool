import { parseSelectionToConditions } from '../src/query-builder'
import { rangeToSQL } from '../src/query-builder'

describe('test rangeToSQL', () => {
  let attributeName = 'atr';

  test('test simple range', () => {
    expect(rangeToSQL('1..2', attributeName))
      .toBe(`(${attributeName} >= 1 AND ${attributeName} <= 2)`)
  })

  test('test simple range with decimals', () => {
    expect(rangeToSQL('1.2..3.4', attributeName))
      .toBe(`(${attributeName} >= 1.2 AND ${attributeName} <= 3.4)`)
  })
})

describe('test)

describe('test parseSelectionToConditions', () => {
  let attributeName = 'atr';

  test('test single negative value', () => {
    expect(parseSelectionToConditions('-3', attributeName))
      .toBe(`${attributeName} = -3`)
  })

  test('test single value with whitespace', () => {
    expect(parseSelectionToConditions('4 ', attributeName))
      .toBe(`${attributeName} = 4`)
  })

  test('test single decimal value', () => {
    expect(parseSelectionToConditions('3.1415', attributeName))
      .toBe(`${attributeName} = 3.1415`)
  })

  test('test less than', () => {
    expect(parseSelectionToConditions('<3', attributeName))
      .toBe(`${attributeName} < 3`)
  })

  test('test greater than', () => {
    expect(parseSelectionToConditions('>3', attributeName))
      .toBe(`${attributeName} > 3`)
  })

  test('test less than or equal', () => {
    expect(parseSelectionToConditions('>=3', attributeName))
      .toBe(`${attributeName} >= 3`)
  })

  test('test multiple values', () => {
    expect(parseSelectionToConditions('1 , < 2,3.14', attributeName))
      .toBe(`${attributeName} = 1 OR ${attributeName} < 2 OR ${attributeName} = 3.14`)
  })

  test('test single range', () => {
    expect(parseSelectionToConditions('1..2', attributeName))
      .toBe(`(${attributeName} >= 1 AND ${attributeName} <= 2)`)
  })
  
  test('test multiple values with ranges', () => {
    expect(parseSelectionToConditions('1..2, >4', attributeName))
      .toBe(`(${attributeName} >= 1 AND ${attributeName} <= 2) OR ${attributeName} > 4`)
  })

})