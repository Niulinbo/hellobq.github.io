document.cookie = 'a=1'
document.cookie = 'b=2'
document.cookie = 'c=3'

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
