(function (ctx) {
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
