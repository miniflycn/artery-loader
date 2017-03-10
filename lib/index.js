'use strict' // eslint-disable-line
const htmlparser = require('artery-htmlparser')
const indentString = require('indent-string')
const transformer = require('./transformer')
const is = require('./tag')
const config = require('./config')
const entities = require('entities')
const path = require('path')
const fs = require('fs')

const checkText = (text) => {
  let num = 0
  let index
  let from = 0
  while ((index = text.indexOf(config.openTag, from)) >= 0) { // eslint-disable-line
    from = index + 1
    num++
  }
  if (num === 0) return true
  from = 0
  while ((index = text.indexOf(config.closeTag, from)) >= 0) { // eslint-disable-line
    from = index + 1
    num--
  }
  if (num === 0) return true
  return false
}

const wrapArr = (arr) => {
  const _push = arr.push.bind(arr) // eslint-disable-line
  arr.push = function push() { // eslint-disable-line
    [].slice.call(arguments, 0).forEach(item => { // eslint-disable-line
      if (arr.indexOf(item) < 0) {
        _push(item)
      }
    })
  }
}

const fixStyle = (str) =>
  str.replace(/ style=\{\{\{([^\}]+)\}\}\}/, (all) => ` ${all.replace(/\s/g, '')}`)

class Parser {
  constructor(str, filepath) {
    this.indent = 1
    this.buffer = []
    this.textBuffer = ''
    this.deps = []
    this.resource = []
    // wrap array
    wrapArr(this.deps)
    wrapArr(this.resource)
    this.childTpl = {}
    const parser = new htmlparser.Parser({
      onopentag: (name, attribs) => {
        const file = path.join(filepath, `${name}.art`)
        const fnName = name.replace(/-/g, '$')
        if (is(name)) {
          const filename = path.join(filepath, `${name}.art`)
          if (fs.existsSync(filename)) {
            if (!this.childTpl[name]) {
              this.childTpl[name] = true
              this.resource.push(filename)
              const childParser = new ChildParser( // eslint-disable-line
                fs.readFileSync(file, 'utf-8'), filepath
              )
              this.createChildFn(fnName, childParser)
            }
            this.write(`_${fnName}_tpl.call(this, ${transformer.attrs(attribs)}, props, function (props) {`) // eslint-disable-line
            this.indent++
            return
          }
          // push custom element to dependencies
          this.deps.push(name)
        }
        this.elementOpen(name, transformer.attrs(attribs))
        this.indent++
      },
      onclosetag: (name) => {
        this.indent--
        if (!this.childTpl[name]) {
          this.elementClose(name)
        } else {
          this.write('})')
        }
      },
      ontext: (text) => {
        if (!text || !text.trim()) return
        text = entities.decodeHTML(entities.decodeXML(text)) // eslint-disable-line
        text = this.textBuffer + text // eslint-disable-line
        if (checkText(text)) {
          transformer.text(text).forEach(out => {
            if (out.bIndent) this.indent += out.bIndent
            this.write(out.code)
            if (out.aIndent) this.indent += out.aIndent
          })
          this.textBuffer = ''
        } else {
          this.textBuffer += text
        }
      },
    }, {
      decodeEntities: false,
      lowerCaseAttributeNames: false,
      lowerCaseTags: false,
    })

    parser.write(fixStyle(str))
    parser.end()
  }

  insert(line) {
    const str = indentString(line, 1 * 2, ' ')
    this.buffer.unshift(str)
    return true
  }

  write(line) {
    const str = indentString(line, this.indent * 2, ' ')
    this.buffer.push(str)
    return true
  }

  elementOpen(name, attribs) {
    this.write(`elementOpen('${name}', null, null, ${attribs})`)
    return true
  }

  elementClose(name) {
    this.write(`elementClose('${name}')`)
    return true
  }

  createChildFn(name, parser) {
    const res = parser.output().output
    this.deps.push.apply(this.deps, res.dependencies)
    this.resource.push.apply(this.resource, res.resource)
    // It's not a good way to do it
    this.insert(`function _${name}_tpl(props, parentProps, childFn) {
${res.replace(/\btext\(props.children\)/, 'childFn.call(this, parentProps)')}
}`)
  }

  output() {
    const output = this.buffer.join('\n')
    const dependencies = this.deps.slice()
    const resource = this.resource.slice()
    return { output, dependencies, resource }
  }
}

class ChildParser extends Parser {
  output() {
    const output = this.buffer.join('\n')
    const dependencies = this.deps.slice()
    const resource = this.resource.slice()
    return { output, dependencies, resource }
  }
}

module.exports = (str, filepath) => {
  const parser = new Parser(str, filepath)
  return parser.output()
}
