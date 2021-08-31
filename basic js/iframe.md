## iframe
在当前页面打开另外一个页面，会加载目标页面所需的全部资源。可以：
- window.open()
- iframe 标签

### iframe 标签常用属性

``` html
<body>
  <iframe src="porject.company.cn" frameborder="0" width="300" height="500"></iframe>
</body>
```

属性名|说明
--|--
src | 目标页面地址
width | iframe 宽度
height | iframe 高度
frameborder | 设置 iframe 边框

其中 `src` 可以动态添加或者变化，来加载不同的 html 页面；width/height/border 也可以通过 css 样式表来设置。

### iframe 的优缺点

优点：
- 很方便快捷、原封不动地嵌入目标页面；
- 遇到加载比较缓慢的图标/广告，可由 iframe 来承载；

缺点：
- 安全性问题。很容易遭到目标站点的攻击，比如目标站点收到攻击后，出现 “钓鱼表单” 等。
- 不利于 seo。尽管搜索引擎可能可以抓取到 iframe 的 url，但是它不会加载并抓取 url 对应页面的内容，因为可能会造成很多问题（可能里面那层URL的内容是不完整的，用户直接访问里面的URL没有意义，或者没有导航系统，甚至URL根本打不开）；
- 可用性问题。
  - 每个 iframe 都需要内存和其他计算资源，它还会占用很多 http 请求，导致网页 load 变慢；
  - 破坏了浏览器的导航。比如：通过变更 url 导致 iframe 内的页面切换，但是浏览记录内还是一条。

总结：iframe 可选择性地较少使用，但不应滥用。

### X-Frame-Options
`X-Frame-Options` 是一个 `响应头`，而不是一个 `meta` 标签。它指示是否允许当前页面被其他页面所引用。它的值可能有：
- X-Frame-Options: deny <br />
  表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
- X-Frame-Options: sameorigin <br />
  表示该页面可以在相同域名页面的 frame 中展示。
- X-Frame-Options: allow-from https://example.com/ <br />
  表示该页面可以在指定来源的 frame 中展示。

### 同源 iframe 通讯
直接使用 `contentWindow` 获取 iframe 内的上下文，使用 `window.parent` 获取父页面上下文；

> 注意要等 iframe load 之后，才能调用 iframe 内的方法！

``` html
<!-- index.html body -->
<iframe
  id="bIframe"
  src="http://localhost:5000/b.html"
  onload="loadB()"
></iframe>

<script>
function fn() {
  console.log('this is index page!')
}
function loadB() {
  const bIframe = document.getElementById('bIframe')
  // bIframe.contentWindow
  // bIframe.contentDocument
  bIframe.contentWindow.fnB()     // this is b page!
}
</script>
```

``` html
<!-- b.html body -->
this is b page!

<script>
  console.log(window.parent.fn()) // this is index page
  function fnB() {
    console.log('this is b page!')
  }
</script>
```

### 跨源 iframe 通讯
使用 [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) 这个 h5 API。

``` js
// otherWindow 是 iframe 的 contentWindow 属性或者 window.open 的返回值
otherWindow.postMessage(message, targetOrigin, [transfer])
```

``` html
<!-- http://localhost:5000/index.html -->

<body>
  <span>this is index page</span>
  <iframe 
    id="aIframe" 
    src="http://localhost:52883/a.html" 
    onload="loadA()"
  ></iframe>
</body>

<script>
  // 接受来自 http://localhost:52883 域名下子页面 a.html 的数据
  window.addEventListener('message', receiveMessage, false)
  function receiveMessage(e) {
    const { origin, data } = e
    if (origin === 'http://localhost:52883') {
      document.querySelector('span').innerText = data
    }
  }

  // 等 a.html 加载完成后，向其发送数据
  function loadA() {
    const aIframe = document.getElementById('aIframe')
    aIframe.contentWindow.postMessage('I am index page!', 'http://localhost:52883')
  }
</script>
```

``` html
<!-- http://localhost:52883/a.html -->

<span>this is a page!</span>
<script>
  // 监听来自父页面的 message
  window.addEventListener('message', receiveMessage, false)
  function receiveMessage(e) {
    const { origin, data } = e
    if (origin === 'http://localhost:5000') {
      document.querySelector('span').innerText = data
    }
  }

  // 父页面发送数据（这里使用 window.parent 访问父页面！）
  window.parent.postMessage('has receive msg!', 'http://localhost:5000')
</script>
```

### refs
- [MDN iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)
- [3 Reasons You Might Not Want To Use Iframes](https://www.ostraining.com/blog/webdesign/against-using-iframes/)
- [MDN X-Frame-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options)
- [使用postMessage进行Iframe跨域通信](https://greenfavo.github.io/blog/docs/05.html)
