
/**
 * Returns a div that contains an indeterminate loading bar with an (optional) message above it
 * @param {string} message message to display above the loading bar 
 */
const createLoader = (message=null) => {
  let loader = document.createElement('div')
  if (message) {
    let loaderMessage = document.createElement('p')
    loaderMessage.innerText = 'message'
    loader.appendChild(loaderMessage)
  }

  let loadingBar = document.createElement('div')
  loadingBar.classList.add('progress')
  
  let indeterminateBar = document.createElement('div')
  indeterminateBar.classList.add('indeterminate')

  loadingBar.appendChild(indeterminateBar)
  loader.appendChild(loadingBar)
  return loader
}

export { createLoader }