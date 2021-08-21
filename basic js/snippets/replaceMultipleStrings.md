### replaceMultipleStrings
一次性替换字符串多个不同的字符，比如 a -> A, b -> C 等。

``` js
/**
 * 
 * @param {string} replacedStr 目标串
 * @param {object} rules 替换规则
 * @param {boolean} caseSensitive 是否区分大小写
 * @param {boolean} globalMatch 是否全部替换
 * @returns {string} 替换后的串
 */
function replaceMultipleStrings(
  replacedStr, 
  rules, 
  caseSensitive = true, 
  globalMatch = true
) {
  if (typeof replacedStr !== 'string') 
    throw new Error(`${replacedStr} is not a string!`)
  if (typeof rules !== 'object') 
    throw new Error(`${rules} is not a object!`)

  let flags = ''
  caseSensitive && (flags += 'i')
  globalMatch && (flags += 'g')

  return replacedStr.replace(
    new RegExp(Object.keys(rules).join('|'), flags),
    matched => rules[matched]
  )
}
```

refs: 
- [如何在JS中利用正则一次replace多个不同字符串？](https://www.zhihu.com/question/60796093)
- [Replace multiple characters in one replace call](https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call)
