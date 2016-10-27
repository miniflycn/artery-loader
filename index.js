const complie = require('./lib')

module.exports = function loader(source) {
  return `module.exports = function render (props){
${complie(source)}
}`
}
