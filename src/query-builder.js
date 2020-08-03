/**
 * Converts a string containing a range in the form (x..y) and converts to an SQL
 * range for the supplied attributename
 * 
 * @param {str} inputString string in the form (x..y) where x and y are attribute values
 * @param {str} attributeName attribute to which range is applied on
 */
const rangeToSQL = (inputString, attributeName) => {
  let [lowerBound, upperBound] = inputString.split(/\.{2}/)
  if (attributeName === 'principleRA') {
    let oldLowerBound = lowerBound
    lowerBound = correctRA(upperBound)
    upperBound = correctRA(oldLowerBound)
  }
  return `(${attributeName} >= ${lowerBound} AND ${attributeName} <= ${upperBound})`
}

/**
 * Converts a string containing a comparison operator and a value to an SQL
 * comparison for a certain attribute.
 * 
 * @param {str} inputString whitespace stripped string containing a single comparator and value
 * @param {str} attributeName attribute to which comparison is applied on
 */
const comparisonToSQL = (inputString, attributeName) => {
  let [,delimiter, value] = inputString.split(/(<(?!=)|>(?!=)|<=|>=)/)
  if (attributeName === 'principleRA') {
    delimiter = correctRADelimiter(delimiter)
    value = correctRA(value)
  }
  return `${attributeName} ${delimiter} ${value}`
}

/**
 * Takes a string representing conditions and the attribute to which the conditions belong
 * and returns a string for use in an SQL where clause.
 * @param {string} selectionString raw string in an acceptable format
 * @param {string} attributeName attribute to which selections are applied to
 */
const parseSelectionToConditions = (selectionString, attributeName) => {
  // remove whitespace and split string on commas
  let disjuncts = selectionString
    .replace(/\s/g, '')
    .split(',')

  let ranges = disjuncts
    .filter(disjunct => disjunct.match(/\.{2}/))
    .map(r => rangeToSQL(r, attributeName))

  let comparisons = disjuncts
    .filter(disjunct => disjunct.match(/(<(?!=)|>(?!=)|<=|>=)/))
    .map(r => comparisonToSQL(r,attributeName))
  
  let singles = disjuncts
    .filter(disjunct => !disjunct.match(/(<(?!=)|>(?!=)|<=|>=|\.{2})/))
    .map(r => `${attributeName} = ${r}`)
  
  return [].concat(ranges, comparisons, singles).join(' OR ')
}

const correctRA = (coordinate) => {
  return 180 - coordinate
}

const correctRADelimiter = (delimiter) => {
  if (delimiter.includes('<')) return delimiter.replace('<','>')
  if (delimiter.includes('>')) return delimiter.replace('>','<')
  return delimiter
}

export { parseSelectionToConditions, rangeToSQL, comparisonToSQL }