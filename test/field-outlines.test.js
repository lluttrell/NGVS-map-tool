import FieldOutlines from '../src/field-outlines'

// ignore the actual imports (untested for now)
jest.mock('../src/assets/field_outlines_long_single.csv', () => jest.fn())
jest.mock('../src/assets/field_outlines_short_single.csv', () => jest.fn())
jest.mock('../src/assets/field_outlines_long_stacked.csv', () => jest.fn())
jest.mock('../src/assets/field_outlines_short_stacked.csv', () => jest.fn())
jest.mock('../src/assets/ngvs_pointings.csv', () => jest.fn())

describe('test _parsePolygon', () => {
  test('test valid string', () => {
    let validString = 'polygon 171.25 15.14 171.24 16.14'
    expect(FieldOutlines._parsePolygon(validString)).toStrictEqual([[171.25, 15.14], [171.24, 16.14]])
  })

  test('test invalid string (no polygon identifier)', () => {
    let invalidString = '171.25 15.14 171.24 16.14'
    expect(() => {
      FieldOutlines._parsePolygon(invalidString)
    }).toThrow('Invalid ADQL polygon string: String must begin with "polygon" identifier')
  })

  test('test invalid string (uneven number of elements)', () => {
    let invalidString = 'polygon 171.25 15.14 171.24'
    expect(() => {
      FieldOutlines._parsePolygon(invalidString)
    }).toThrow('Invalid ADQL polygon string: String must contain an even number of values to form coordinate pairs')
  })

  test('test invalid string (NaN)', () => {
    let invalidString = 'polygon 171.25 15.14 171.24 foo'
    expect(() => {
      FieldOutlines._parsePolygon(invalidString)
    }).toThrow()
  })
})

describe('test _parseFilterName',() => {
  test('test valid filtername', () => expect(FieldOutlines._parseFilterName('u.MP314')).toBe('u'))
  test('test invalid filtername', () => expect(()=> {
    FieldOutlines._parseFilterName('d.MP314')
  }).toThrow('Invalid Filter Name: d is not defined in app.config'))
})