## 前端路由
前端路由的特点：
- 更改 url 时，不刷新页面。不向服务器请求任何资源。
- 监听 url 地修改后，匹配路由表对应的 UI 组件来展示。

## hash-router
hash 路由是前端路由的一种，也是 h5 history-router 出现之前的前端路由实现方式。

原理/特点：当[修改 window.location.hash 时不会刷新页面](location.md)，也不会向服务器请求任何资源，仅是前端监听 hash 地变更来匹配路由表规则。

### 举例
``` html
<ul>
  <li><a href='/home'>home</a></li>
  <li><a href='/about'>about</a></li>
  <div id="routeView"></div>
</ul>
```

``` js
let routeView = ''
function onLoad() {
  routeView = document.getElementById('routeView')
  changeView()

  let event = document.getElementsByTagName('ul')[0]
  event.addEventListener('click', e => {
    if (e.target.nodeName === 'A') {
      window.location.hash = e.target.getAttribute('href')
      changeView()
      e.preventDefault()
    }
  })
}

function changeView() {
  switch (window.location.hash) {
    case '#/home':
      routeView.innerHTML = 'home'
      break;
    case '#/about':
      routeView.innerHTML = 'about'
      break;
    default:
      // 没匹配到 hash
      routeView.innerHTML = ''
  }
}

window.addEventListener('DOMContentLoaded', onLoad)

// 监听 hashchange 来更新视图
window.addEventListener('hashchange', changeView)
```

### refs
- [[vue-router] hash模式与history模式的区别](https://juejin.cn/post/6844903841029160968)
- [前端路由模式详解（hash和history）](https://juejin.cn/post/6861586972696444942)
