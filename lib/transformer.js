'use strict' // eslint-disable-line
const config = require('./config')

const attr = (str) => {
  if (
    str.indexOf(config.openTag) !== 0 &&
      str.indexOf(config.closeTag) !== str.length - config.closeTag.length
  ) {
    return `"${str}"`
  }

  return str.substring(
    config.openTag.length,
    str.length - config.closeTag.length
  )
}

const attrs = (obj) => {
  let res = '{\n'
  const attrList = Object.keys(obj)
  if (attrList.length === 0) return 'null'
  attrList
    .forEach(key => {
      if (key === 'class') {
        res += `  className: ${attr(obj[key])},\n`
      } else {
        res += `  '${key}': ${attr(obj[key])},\n`
      }
    })
  res = res.substring(0, res.length - 2)
  res += '\n}'
  return res
}

const tokens = [
  [/^if ([\s\S]+)/, 'if-start'],
  [/^\/if/, 'if-end'],
  [/^else( +if +([\s\S]+))?/, 'else'],
  [/^each ([\s\S]+) as ([a-z]+)( ([a-z]+))?/, 'each-start'],
  [/^\/each/, 'each-end'],
  [/^include (['"])([^'"]+)\1/],
]

let LNum = 0
const genL = () => `l${LNum++}`

const recure = (str, output) => {
  const input = str.trim()
  let res

  if (!input) return

  tokens.every(token => {
    const data = input.match(token[0])
    if (data) {
      res = {
        type: token[1],
        data,
      }
      return false
    }
    return true
  })

  if (res) {
    switch (res.type) {
      case 'if-start':
        output.push({
          // after indent
          aIndent: 1,
          code: `if (${res.data[1]}) {`,
        })
        break
      case 'if-end':
        output.push({
          // before indent
          bIndent: -1,
          code: '}',
        })
        break
      case 'else':
        output.push({
          bIndent: -1,
          aIndent: 1,
          code: res.data[1] ?
            `} else if (${res.data[2]}) {` :
            '} else {',
        })
        break
      case 'each-start': // eslint-disable-line
        const indexKey = res.data[3] ? res.data[4] : 'i'
        const l = genL()
        output.push({
          needKey: indexKey,
          aIndent: 1,
          code: `for (var ${indexKey} = 0, ${l} = ${res.data[1]}.length; ${indexKey} < ${l}; ${indexKey}++) {`, // eslint-disable-line
        })
        output.push({
          code: `const ${res.data[2]} = ${res.data[1]}[${indexKey}]`,
        })
        break
      case 'each-end':
        output.push({
          needKey: false,
          bIndent: -1,
          code: '}',
        })
        break
      default:
        throw new Error('Must have an Error!')
    }
  } else {
    output.push({
      code: `text(${input})`,
    })
  }
}

const allSpace = /^\s*$/

const text = (str) => {
  // TODO 简单点处理，反正 artTemplate 也是不完备的
  const sections = str.split(config.openTag)
  const res = []
  if (sections.length > 0) {
    const beforeStr = sections.shift()
    if (!allSpace.test(beforeStr)) res.push({ code: `text(\`${beforeStr}\`)` })
  }
  sections.forEach(section => {
    const arr = section.split(config.closeTag)
    const outerText = arr[1]
    recure(arr[0], res)
    if (!allSpace.test(outerText)) res.push({ code: `text(\`${outerText}\`)` })
  })
  return res
}

module.exports = { attr, attrs, text }
