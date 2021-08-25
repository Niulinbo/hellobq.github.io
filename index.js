
window.addEventListener('DOMContentLoaded', onLoad)
window.addEventListener('popstate', () => {
  console.log('popstate ....')
  changeView()
})

let routeView = ''
function onLoad() {
  routeView = document.getElementById('routeView')
  changeView()
  let event = document.getElementsByTagName('ul')[0]
  event.addEventListener('click', (e) => {
    if (e.target.nodeName === 'A') {
      e.preventDefault()

      // window.location.hash = e.target.getAttribute('href')
      history.pushState(null, "", e.target.getAttribute('href'))

      changeView()
    }
  })
}

function changeView() {
  switch (location.pathname) {
    case '/home':
      routeView.innerHTML = 'home'
      break;
    case '/about':
      routeView.innerHTML = 'about'
      break;
    default:
      routeView.innerHTML = ''
  }
}
