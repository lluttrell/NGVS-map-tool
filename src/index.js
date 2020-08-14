import App from './app'

document.addEventListener('DOMContentLoaded', async function() {
  const appModel = new App()
  await appModel.init()
});

