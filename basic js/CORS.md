## CORS
`Cross Origin Resource Sharing` 跨域资源共享，允许跨源资源共享得以安全进行。

什么情况下需要 CORS：
- xhr/fetch 发起的跨站点 http 请求；
- 使用 `drawImage` 将 images/video 绘制的 canvas；
- CSS 中通过 `@font-face` 使用跨源字体资源；

### CORS 涉及到的 response headers
- `Access-Control-Allow-Origin`: 允许哪些站点的请求。无论是否是 **简单请求**，都要设置之。
- `Access-Control-Allow-Headers`: 允许请求头设置一些自定义请求头，或者某些请求头的值不符合 CORS 要求的枚举值。
- `Access-Control-Allow-Methods`: 允许除开（GET、POST、HEAD）请求方法。
- `Access-Control-Allow-Expose-Headers`: 允许客户端获取到自定义响应头。
- `Access-Control-Allow-Credentials`: 允许客户端发送请求时，携带 cookie。

### 简单请求与复杂请求
- 请求方法仅限于：`GET`、`POST`、`HEAD`
- 允许人为设置的集合：`Accept`、`Accept-Language`、`Content-Language`、`Content-Type`。其中 `Content-Type` 的值仅限：
  - `text/plain`
  - `multipart/form-data`
  - `application/x-www-form-urlencoded`

任何不符合上述要求的请求，将会被认为 **复杂请求**。对于复杂请求：
- 浏览器会有一次 **预请求**。
- 服务端可能要返回多个 `Access-Control-Allow-` 字段。

对于简单的 CORS 请求，直接在响应头内设置 `Access-Control-Allow-Origin` 字段即可：

``` js
fetch('http://127.0.0.1:7001')
  .then(res => res.json())
  .then(console.log)

async index() {
  const { ctx } = this
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    msg: 'hi egg!'
  }
}
```

### 预请求
CORS 每次进行 **复杂请求** 之前，默认都会先发出预请求，目的是让浏览器向服务器确认一些信息：
- 当前网页所处的源（protocol + domain + port）是否在服务器的白名单内。
- 可以使用哪些 HTTP 方法和请求头。
- 是否可携带 cookie。

不满足服务器 CORS 设置，将报错。一个简单的预请求，修改 `Content-Type` 的值是 `application/json`：

``` js 
fetch(
  'http://127.0.0.1:7001', 
  {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'patch msg'
    })
  }
)
.then(res => res.json())
.then(console.log)

async indexOpt() {       //  这是 options 预请求 
  const { ctx } = this;
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')
  ctx.status = 200
  ctx.body = 'ok'
}
async index() {          // 这是真正的 post 请求
  const { ctx } = this
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = ctx.body, ctx.request.body
}
```

可以在浏览器控制台中看到 `OPTIONS` 请求：
![CORS-预请求1.png](imgs/CORS-预请求1.png)

![CORS-预请求2.jpg](imgs/CORS-预请求2.jpg)

> chrome 90 之前展示预请求的方法：在 chrome 地址栏总输入 chrome://flags/#out-of-blink-cors，将其设置为 Disabled 后重启浏览器

### 设置自定义请求头

### 获取自定义响应头

### 发起请求时，携带 cookie

### refs
- [MDN 跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [CORS 完全手册之 CORS 详解](https://mp.weixin.qq.com/s/Cqay4VvYDjADbT_b97xW2w)
- [nodejs.ForbiddenError: invalid csrf token,egg中post失败解决方案](https://blog.csdn.net/wron_path/article/details/112425731)
- [Egg.js (五) 发送POST请求和获取参数](https://blog.csdn.net/zhuming3834/article/details/107553855)
- [MDN fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
- [Chrome不显示OPTIONS请求的解决方法2021版chrome90](https://blog.csdn.net/letterTiger/article/details/119024009)

