## querystring
[querystring](https://github.com/jgallen23/querystring/blob/master/lib/querystring.js)

parse 方法：
- 获取 url 参数和转换成 url 参数；
- 零依赖；
- 支持多个相同 key，value 是个数组。

``` js
// url http://localhost/?foo=bar&cow=moo
querystring.parse(); //no argument passed in assumes window.location.search
// returns { foo: 'bar', cow: 'moo' }

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
// returns 'foo=bar&baz=qux&baz=quux&corge='
```

实现 queryString：
``` javascript
(function (ctx) {
  /**
   * decodeURIComponent encodeURIComponent 可能抛出格式化错误 (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent#%E5%BC%82%E5%B8%B8)
   * 通过类属性信息，判断变量类型
  */
  function encode(str) {
    try {
      return encodeURIComponent(str)
    } catch (e) {
      return ''
    }
  }
  
  function decode(str) {
    try {
      return decodeURIComponent(str)
    } catch (e) {
      return ''
    }
  }

  function type(target) {
    return ({}).toString.call(target).slice(8, -1)
  }
  
  var querystring = {
    parse: function(string) {
      string = string !== undefined ? string : window.location.search
      if (type(string) !== 'String' || !string) {
        return {}
      }
  
      var obj = {}
      string = decode(string)
      string.replace(/([^&=]+)=([^&=]*)/g, (_, k, v) => {
        obj.hasOwnProperty(k)
          ? type(obj[k]) === 'Array'
            ? obj[k].push(v) 
            : obj[k] = [obj[k], v]
          : obj[k] = v
      })
      return obj
    },
    stringify: function(obj) {
      if (type(obj) !== 'Object') {
        return ''
      }
  
      var strs = []
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (type(obj[k]) === 'Array') {
            for (var i = 0; i < obj[k].length; ++i) {
              strs.push(
                encode(k) + '=' + encode(obj[k][i])
              )
            }
          } else {
            strs.push(
              encode(k) + '=' + encode(obj[k])
            )
          }
        }
      }
  
      return strs.join('&')
    }
  }
  ctx.querystring = querystring
})(window);
```
