## URLSearchParams
[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 是挂载在 window 下的原生构造方法（或者说是一个类）。用其生成的实例具有处理 url 查询字符串的能力。

### 日常作用
- pasre： 解析一个字符串，找到其中的 key、value。作用对象：cookie、url；
- stringify：序列化数组或者对象字面量，ajax 之前请求序列化参数；

### 用 URLSearchParams 创建对象
可用字符串、数组、对象字面量作为参数：

``` js
// 字符串形式
const search = new URLSearchParams(location.search)
const query = new URLSearchParams('?a=1&b=2')

// 二维数组形式
const paramsByArr = new URLSearchParams([['a', 1], ['b', 2]])

// 键值对儿形式
const paramsByObj = new URLSearchParams({
  a: 1,
  b: 2
})
```

### URLSearchParams 实例方法
方法名 | 作用
-- | -- 
append(name, key) | 添加新的查询参数
delete(name) | 根据键名删除对应的查询字符串
keys() | 返回查询参数的迭代对象
values() | 返回查询参数值的迭代对象
entries() | 返回查询参数对的迭代对象
get(name) | 获取某个查询参数值，没找到则返回 **null**
getAll(name) | 获取某个查询参数值列表
has(name) | 判断是否存在某个查询参数

``` js
const query = new URLSearchParams('?a=1&b=2')
query.append('c', 3)
query.toString()   // a=1&b=2&c=3

query.delete('b')
query.toString()   // a=1&c=3

for (let [k, v] of query) {
  ...
}

query.get('a')     // '1'
query.get('b')     // null
query.getAll('b')  // []

query.has('a')     // true
```
### 操作 cookie
判断是否存在某个 cookie，获取某个 cookie
``` js
document.cookie = 'a=1'
document.cookie = 'b=2'
document.cookie = 'c=3'

// 把 document.cookie 内的空格、分号进行转换
const replacedObj = {
  ' ': '',
  ';': '&'
}
const cookieChanged = document.cookie.replace(
  new RegExp(Object.keys(replacedObj).join('|'), 'g'), 
  matched => replacedObj[matched]
)
const urlSearchParams = new URLSearchParams(cookieChanged)
urlSearchParams.has('a') // true
urlSearchParams.get('a') // 1
```

### 兼容性
IE 不兼容，chrome 49+ 开始兼容。这有 polyfill [url-search-params-polyfill](https://github.com/jerrybendy/url-search-params-polyfill/)、[url-search-params.js](https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js)

![URLSearchParams-兼容](./imgs/URLSearchParams-兼容.jpg)

[手写 URLSearchParams](https://github.com/ethanius/URLSearchParams/blob/master/urlsearchparams.js)

### refs
- [张鑫旭 JS URL()和URLSearchParams() API接口详细介绍](https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/)
- [让URLSearchParams帮你生成和解析参数字符串](https://zhuanlan.zhihu.com/p/29581070?utm_source=com.daimajia.gold&utm_medium=social)
- [new URLSearchParams()获取不到第一个参数了？](https://juejin.cn/post/6844904161184595982)
- [qs](https://github.com/ljharb/qs)
- [querystring](https://github.com/Gozala/querystring)
- [querystring-util](https://github.com/sm-bugu/querystring-util)
