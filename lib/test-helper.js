'use strict' // eslint-disable-line
const indentString = require('indent-string')
const dom = { tagname: 'body', children: [] }
// mark the target dom
let point = dom

const elementOpen = (tagname, key, staticProps, props) => {
  const ele = {
    tagname,
    props,
    children: [],
    parent: point,
  }
  point.children.push(ele)
  point = ele
}

const text = (content) => {
  point.children.push({
    tagname: 'text',
    content,
  })
}

const elementClose = (tagname) => {
  if (point.tagname !== tagname) {
    throw new Error(`Tag "${tagname}" should not be closed before tag ${point.tagname}`)
  }
  point = point.parent
}

const clear = () => {
  dom.children.length = 0
  point = dom
}

const write = (tag) => {
  const props = tag.props ? Object.keys(tag.props).map(prop => {
    return `${prop}="${tag.props[prop]}"`
  }) : []
  let code
  if (tag.tagname === 'text') {
    code = tag.content
  } else {
    code = `<${tag.tagname} ${props.join(' ')}>`
    if (tag.children && tag.children.length > 0) {
      code += tag.children.map(child => write(child)).join('') // eslint-disable-line
    }
    code += `</${tag.tagname}>`
  }
  return code
}

const result = () => {
  return write(dom)
}

module.exports = {
  elementOpen,
  elementClose,
  text,
  clear,
  result,
}
