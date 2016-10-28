const complie = require('./lib')

module.exports = function loader(source) {
  this.cacheable()
  return `module.exports = function render (props){
${complie(source).output}
}`
}
