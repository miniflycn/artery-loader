'use strict' // eslint-disable-line
const htmlparser = require('htmlparser2')
const indentString = require('indent-string')
const transformer = require('./transformer')

const buffer = []
let indent = 1
let needKey

const write = (line) => {
  const str = indentString(line, indent * 2, ' ')
  buffer.push(str)
  return true
}

const elementOpen = (name, attribs) => {
  if (needKey) {
    write(`elementOpen('${name}', ${needKey}, null, ${attribs})`)
  } else {
    write(`elementOpen('${name}', null, null, ${attribs})`)
  }
  return true
}

const elementClose = (name) => {
  write(`elementClose('${name}')`)
  return true
}

const handler = {
  onopentag: function onopentag(name, attribs) {
    elementOpen(name, transformer.attrs(attribs))
    indent++
  },
  onclosetag: function onclosetag(name) {
    indent--
    elementClose(name)
  },
  ontext: function ontext(text) {
    if (!text || !text.trim()) return
    transformer.text(text).forEach(out => {
      if ('needKey' in out) {
        needKey = out.needKey
      }
      if (out.bIndent) indent += out.bIndent
      write(out.code)
      if (out.aIndent) indent += out.aIndent
    })
  },
}

module.exports = (str) => {
  const parser = new htmlparser.Parser(handler, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
  })

  parser.write(str)
  parser.end()
  const res = buffer.join('\n')
  buffer.length = 0
  indent = 1
  return res
}
