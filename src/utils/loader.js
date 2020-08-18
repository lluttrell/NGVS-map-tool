
/**
 * Returns a div that contains an indeterminate loading bar with an (optional) message above it
 * @param {string} message message to display above the loading bar
 * @return {HTMLElement} HTML div containing message and loading bar
 */
const createLoader = (message=null) => {
  let loader = document.createElement('div')
  if (message) {
    let loaderMessage = document.createElement('p')
    loaderMessage.innerText = message
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

const createCircularLoader = () => {
  let loader = document.createElement('div')
  loader.classList.add('preloader-wrapper','small','active')
  loader.innerHTML = 
    `<div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>`
  return loader  
}

export { createLoader, createCircularLoader }