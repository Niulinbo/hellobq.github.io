## history
挂载在 window 全局上下文的 history 对象使我们有操作网页**历史浏览记录**的能力。

window.history 是 window.History 的实例对象（browser 环境下，可省略 window）：
``` js
window.history instanceof window.History  // true
```

### length 属性
返回在当前标签页内的历史浏览记录数，只读。
- 打开浏览器，会自动打开一个页面，此时 history.length 是 1；
- 当输入 url 进行跳转后，此时的 history.length 是 2；
- 点击浏览器返回上一页按钮，返回上一页后，history.length 还是 2，因为 url 产生的历史记录没被抹除。
- 当通过浏览器 “清除历史记录” 时，此时的 history.length 才是 1；

### scrollRestoration 属性
scrollRestoration = scroll + restoration（恢复），在跳转页面时，是否恢复页面跳转前时的滚动位置。

例如 url1 -> url2，让点击浏览器回退按钮时，
- auto 自动（默认）<br />
  url1 对应的页面的滚动位置会还原。
- manual 手动
  url1 对应的页面的滚动位置会在页面顶部。

防止自动恢复页面位置：
``` js
history.scrollRestoration && (
  history.scrollRestoration = 'manual'
);
```

### state 属性
只读。用来区分不同历史记录的状态值。可通过 `pushState`、`replaceState` API 来设置它。

### back 方法
history.back() 返回上一个浏览记录，等同于 history.go(-1)。
> 注意：当 history.length 是 1 时，即使执行了 back/go(-1)，浏览器也不会报错。

### forward 方法
history.forward() 前往下一个浏览记录，等同于 history.go(1)。
> 注意：当浏览器历史栈处于最顶端时（当前页面处于最后一页时），即使执行了 forward/go(1)，浏览器也不会报错。

### go 方法
跳转到其他页面。比如某个标签页的浏览记录是 a.html -> b.html -> c.html -> d.html，且此时 url 是 c.html：
- history.go(2) 此时页面不跳转。
- history.go(1) 此时 url 是 d.html。
- history.go(0) **刷新页面**，注意这是刷新当前页面的一种方法！
- history.go(-1) 此时 url 是 b.html。
- history.go(-2) 此时 url 是 a.html。

### pushState 方法
`history.pushState(state, title, url) ` <br />
插入一条浏览记录，并记录它的状态值（state）和页面标题（title）。

### replaceState 方法
`history.replaceState(state, title, url) ` <br />
更新一条浏览记录，并替换之前的状态值（state）和页面标题（title）。

### pushState VS replaceState
- 同：<br />
  1. 都更改了历史记录（修改了 url，增加了状态值）；
  2. 虽然会更改 url，但不会发送请求，不会刷新页面！
  3. 至少传递两个参数！
- 异：<br />
  pushState 是新增记录；replaceState 则是替换当前记录；

### onpopstate 事件
在做出浏览器动作时，会触发该事件，比如用户手动点击了 “前进”、“回退” 按钮，或者用 js 调用了 back/forward/go 方法。所以可以通过监听 popstate 事件来判断当前标签页的浏览记录是否在变换。

**注意**：pushState、replaceState 在修改历史记录时，不会触发 popstate。

拦截举例：a.html -> b.html，当用户点击回退时，返回 c.html 而不是 a.html
``` js
;(function() {
  window.onpopstate = function() {
    history.replaceState(null, '', 'c.html')
  }
  history.pushState(null, '', 'b.html')
})()
```
