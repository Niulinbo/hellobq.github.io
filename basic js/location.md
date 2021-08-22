## location
挂载在 window 下的 js 对象，用来获取网站 url 的信息。

### 怎么访问 location
window.location 或者 document.location。

``` js
window.location === document.location // true
```

window 和 document 下的 location 指向了同一地址。
> 在 browser 环境下，window.location 可以简写成 location，但是还是推荐写 window.location，它清晰地标识 location 对象所处的上下文。<br />
> 推荐使用 window.location 而不是 document.location。根据 W3C 准则，为了跨浏览器安全和兼容性更好；


### 获取 window.location 下的属性
以下面的 url 为例，window.location 可获取 url 的信息：

```
https://www.samanthaming.com/tidbits/?filter=JS#2
```

属性名 | 返回值 | 说明
-- | -- | -- 
protocol | https: | 注意含有冒号 :
origin | https://www.samanthaming.com | 请求源。协议 + 域名 + 端口
host | www.samanthaming.com | 域名 + 端口
hostname | www.samanthaming.com | 域名
port | '' | 端口
pathname | /tidbits/ | 请求路径
search | ?filter=JS | 序列化参数，注意含有 ?
hash | #2 | 锚点或者片段标识符，注意含有 #
href | https://www.samanthaming.com/tidbits/?filter=JS#2 | 完整的 url

注意：如果 url 带有端口号，host 比 hostname 将包含端口号！

### 设置 window.location 下的属性值

属性名 | 是否可被设置 | 效果
-- | -- | --
protocol<br /> host<br />hostname<br />port<br />pathname<br />search | 是 | 会刷新页面
origin | 否 | 赋值无效，唯一一个不能被赋值的属性
hash | 是 | 不会刷新页面。如果页面有对应的锚点，将会滚动到该元素位置

### window.location 的函数

函数名 | 作用 
-- | --
reload | 重新加载当前页面，该页面的访问记录还是一条
replace | 跳转到指定 url，并从历史访问记录中删除当前页面 url
assign | 跳转到指定 url，不会从历史访问记录中删除当前页面 url
toString | 返回编码后（encodeURIComponent）的 URL 字符串，和 window.location.href 相等

注意： 跳转到指定 url，如果要保存当前页面的历史浏览记录，则使用 assign 、给 href 属性赋值、直接给 window.location 赋值（三种），否则使用 replace。

### assign VS href
尽管 assign 和 href 作用是一样的，但它们之间也有细微的差别：
- 执行速度上，直接修改 href 属性更快；
- assign 方法让更方便写 Jest 测试用例；

### refs
- [MDN location](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location)
- [W3C dom-location](https://html.spec.whatwg.org/multipage/history.html#dom-location)
- [JavaScript 中的 window.location 和 document.location 有什么区别？](https://stackoverflow.com/questions/2430936/whats-the-difference-between-window-location-and-document-location-in-javascrip)
- [location.href 属性与 location.assign() 方法](https://stackoverflow.com/questions/10302905/location-href-property-vs-location-assign-method)
