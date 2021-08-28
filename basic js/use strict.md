## use strict
严格模式是：用严格的条件来运行 js 代码。
> 严格的条件取决于严格模式的规则。

### 为什么会出现严格模式/严格模式的好处
- 消除 `Javascript` 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 `Javascript` 做好铺垫。

### 严格模式的兼容情况
- Internet Explorer 10 + 
- Firefox 4+ 
- Chrome 13+
- Safari 5.1+
- Opera 12+

对于不兼容 `use strict` 代码的浏览器，就会把其当作未赋值的字符串字面量，会忽略它。

### 严格模式的作用域
- 如果想为某个 js 脚本开启严格模式，在所有语句之前放置 `"use strict"` ;

  ``` html
  <script>
    "use strict";
    var v = "Hi!  I'm a strict mode script!";
  </script>
  ```

  要注意的是，不同的 `script` 是否为严格模式各自独立，例如下方第一个 `script` 采用严格模式，第二个 `script` 仍然能正常运行：

  ``` html
  <script>
    'use strict'
    var a = 10
  </script>
  <script>
    b = 10
    // 此时 a b 都是 10
  </script>
  ```


- 给某个函数开启严格模式，把 `'use strict'` 放置函数体语句之前；

  ``` js
  function fn() {
    "use strict";
    var v = "Hi!  I'm a strict mode script!";
  }
  ```

### 使用严格模式带来的变化
严格模式下，**变量**、**对象字面量**、**函数**的变化。

#### 变量
- 变量只能在声明后才能使用;
- 不能使用 `delete` 删除全局变量；
- 不能使用保留字（`let`、`static`、`yield` 等）作为变量名；

``` js
'use strict'

// Uncaught ReferenceError: a is not defined
a = 1        
console.log(a)

var b = 'b'
// Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
delete b

// Uncaught SyntaxError: Unexpected strict mode reserved word
let = 1;        
console.log(let)
```

#### 对象
- 不能给只读属性赋值；
- 不能给不可扩展对象添加属性；

> 非严格模式下不会报错，以上操作不会有效，但不会报错等任何提醒。

``` js
'use strict'

var obj = {
  a: 'a'
}
Object.defineProperty(obj, 'a', { writable: false })

// Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'
obj.a = 'b'

// Uncaught TypeError: Cannot add property b, object is not extensible
Object.preventExtensions(obj)
```

#### 函数
- 要求行参名必须唯一；
- 参数的值不会随着 `arguments` 对象的值的改变而变，`arguments` 对象的值也不会随着参数的值的改变而变；
- 禁止使用 `arguments.callee`；

``` js
'use strict'

// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
function fn(a, a, b) {
  return a + a + b
}
fn(1, 2, 3) // 非严格模式，返回 7（a 是 2）

;(function fn(a) {
  a = 2             // a 是 2, arguments[0] 是 1
  arguments[0] = 3  // arguments[0] 是 3，a 还是 2,
  
  // Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
  arguments.callee(100)
})(1)
```

#### this 指向
- 非严格模式下：使用函数的 `call/apply` 方法时，`null/undefined` 的值会被自动转成 `window`；
严格模式下，仍然指向 `null/undefined`。
- 函数内作用域，`this` 默认是 `undefined` 而不再是 `window`；
- 如果使用构造函数时，如果忘了加 `new`，`this` 不再指向全局对象，而是 `undefined` 报错；

``` js
'use strict'

;(function() {
  // this 是 undefined
})()

var a = 'a'
function fn() {
  // 非严格模式是 'a'
  // 严格模式报错：Uncaught TypeError: Cannot read property 'a' of null
  console.log(this.a)
}
fn.call(null)


function Fn() {
  console.log(this)
}
Fn()      // 非严格模式是 window，严格模式是 undefined
new Fn()  // Fn 实例对象
```

还有其他的规则限制：八进制数字处理、eval 等。

### refs
- [MDN 严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)
- [JS 必须知道的基础《严格模式 'use strict'》](https://juejin.cn/post/6844904120214618120#heading-11)
- [js 严格模式](https://www.bilibili.com/video/BV1rv411e72J?from=search&seid=9913471203769297940)
