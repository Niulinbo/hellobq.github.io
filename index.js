document.cookie = 'a=1'
document.cookie = 'b=2'
document.cookie = 'c=3'

/**
 * 
 * @param {string} replacedStr 目标串
 * @param {object} rules 替换规则
 * @param {boolean} caseSensitive 是否区分大小写
 * @param {boolean} globalMatch 是否全部替换
 * @returns string 替换后的串
 */
function replaceMany(replacedStr, rules, caseSensitive = true, globalMatch = true) {
  if (typeof replacedStr !== 'string') throw new Error(`${replacedStr} is not a string!`)
  if (typeof rules !== 'object') throw new Error(`${rules} is not a object!`)

  let flags = ''
  caseSensitive && (flags += 'i')
  globalMatch && (flags += 'g')

  return replacedStr.replace(
    new RegExp(Object.keys(rules).join('|'), flags),
    matched => rules[matched]
  )
}


const replacedObj = {
  ' ': '',
  ';': '&'
}
console.log(
  replaceMany(document.cookie, replacedObj)
)

const urlSearchParams = new URLSearchParams(
  document.cookie.replace(
    new RegExp(Object.keys(replacedObj).join('|'), 'g'), 
    matched => replacedObj[matched]
  )
)
console.log(
  urlSearchParams.get('a'),
  urlSearchParams.getAll('a'),
  urlSearchParams.has('b'),
)
