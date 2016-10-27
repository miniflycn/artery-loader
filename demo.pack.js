const fs = require('fs')
const complie = require('./lib')

fs.writeFileSync(
  './component/app/index.js',
  `import { elementOpen, elementClose, text } from '../../src/dom'
import { container } from '../../src/class'
import opts from './data/action'
import mock from './data/mock'
import data from './data/view.data'
module.exports = container(function render (props){
${complie(
    fs.readFileSync('./component/app/tpl.html', 'utf-8')
  )}
}, opts, data, mock)`,
  'utf-8'
)
