/**
 * @fileoverview
 * This is the main javascript file for the application. After rendering the initial skeleton DOM
 * it creates and initializes an instance of App
 */

import App from './app'

document.addEventListener('DOMContentLoaded', async function() {
  const appModel = new App()
  await appModel.init()
})

