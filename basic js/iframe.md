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

