## let、const
es6 新增的用来声明变量的方式。它们有很多相同的特性：
- 不可重复声明
  > 使用 let/const 声明的变量，不可再用其他保留字声明
- 没有变量提升，不能在声明之前使用变量
  > 用 let/const 声明的变量，不能提前使用（不能再像 es5 var 一样的变量提升）。<br />
  > 让变量的声明周期更加可控。
- 仅在块级作用域内有效
  > 块级作用域可以由一个函数或一对花括号内部构成，在块级作用域内用 let/const 声明的变量外界无法直接访问。<br />
  > 给 js 添加了灵活性和其他语言的一致性。

### let/const 之间的差别
`const` 比 `let` 约束条件多：用 const 声明的变量
- 必须初始化。
- 不能再更改它的引用。

``` js
let a = '1'
a = 2

const a     // Uncaught SyntaxError: Missing initializer in const declaration

const b = 'b'
b = 2       // Uncaught TypeError: Assignment to constant variable.

const arr = []
arr.push(1) // 改变 arr 内部元素，但没改变 arr 的引用
arr = {}    // error! 改变了 arr 的引用
```

### 为什么优先使用 const，而不是 let?
如果可预见的变量引用会发生更改，就用 `let`，否则就优先使用 `const`。因为 `const` 比 `let` 更加严格，能保证变量指向的内存地址不发生变化。
- 可读性更强。
- 可以避免后面代码因无意修改某个变量的值而产生了 bug。

### refs
- [let 和 const 命令](https://es6.ruanyifeng.com/#docs/let)
- [es6 中，为什么要优先使用 const?
](https://segmentfault.com/q/1010000022364927)
- [let/const 变量声明及其特性](https://juejin.cn/post/6881513523826917390#heading-1)
