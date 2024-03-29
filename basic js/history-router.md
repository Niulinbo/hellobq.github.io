## history-router
history 路由是[前端路由](hash-router.md)的一种，是前端路由实现的主要方式。

原理/特点：利用 h5 新增的 `pushState`、`replaceState` 两个 APi 来实现的，通过它们能完成 url 跳转且不刷新页面。

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
      window.history.pushState(null, '', e.target.getAttribute('href'))

      // pushState/replaceState 不会触发 popstate 事件，需要手动更新 view
      changeView()
      e.preventDefault()
    }
  })
}

function changeView() {
  switch (window.location.pathname) {
    case '/home':
      routeView.innerHTML = 'home'
      break;
    case '/about':
      routeView.innerHTML = 'about'
      break;
    default:
      // 没匹配到请求路径
      routeView.innerHTML = ''
  }
}

window.addEventListener('DOMContentLoaded', onLoad)

// 监听 popstate 来更新视图
window.addEventListener('popstate', changeView)
```

### history-router VS hash-router
- 实现原理不同。
- history-router 解决了 hash-router 的部分问题：
  1. url 更美观；
  2. hash 只能存字符串，且有长度限制，state 可存放任意类型数据。

### history-router 带来的问题
- 用户刷新页面时，可能会出现 404 情况。因为没有对应的页面或 API 接口，对应 SPA 来说，只有 index.html，所以通常需要做 [404 配置](https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#html5-%E6%A8%A1%E5%BC%8F)。

### refs
- [前端路由实现原理（history）](https://juejin.cn/post/6844903634954633224)
- [两种前端路由实现的方式hash模式和history模式的详解与区别](https://juejin.cn/post/6844903991353016328)
- [[vue-router] hash模式与history模式的区别](https://juejin.cn/post/6844903841029160968)
- [前端路由模式详解（hash和history）](https://juejin.cn/post/6861586972696444942)
