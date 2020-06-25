const rangeToSQL = (inputString, attributeName) => {
  let [lowerBound, upperBound] = inputString.split(/\.{2}/)
  return `(${attributeName} >= ${lowerBound} AND ${attributeName} <= ${upperBound})`
}

const comparisonToSQL = (inputString, attributeName) => {

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
    .filter(disjunct => disjunct.match(/(<|<=|>|>=)/))
    .map(r => comparisonToSQL(r,attributeName))
  
  return ranges
}

export { parseSelectionToConditions, rangeToSQL }