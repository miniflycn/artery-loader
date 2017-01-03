/* eslint-env mocha */
const complie = require('../lib')
const helper = require('../lib/test-helper')

describe('template', () => {
  // it('should support property variable', () => {
    // const foo = new Function( // eslint-disable-line
    //   'elementOpen',
    //   'elementClose',
    //   'text',
    //   'state',
    //   complie(`
    //     <a href={{state.url}}>{{state.text}}</a>
    //   `)
    // )

    // helper.clear()
    // foo(
    //   helper.elementOpen,
    //   helper.elementClose,
    //   helper.text,
    //   { url: 'http://1688.com', text: '1688' }
    // )

    // console.log(helper.result())
  // })

  // it('should support property variable', () => {
  //   const foo = new Function( // eslint-disable-line
  //     'elementOpen',
  //     'elementClose',
  //     'text',
  //     'state',
  //     complie(`
  //       <div>
  //         {{ if state.admin === true }}
  //           <p>Hello</p>
  //       </div>
  //       <div>
  //         {{ /if }}
  //           <p>Daniel</p>
  //       </div>
  //     `)
  //   )

  //   helper.clear()
  //   foo(
  //     helper.elementOpen,
  //     helper.elementClose,
  //     helper.text,
  //     { admin: false }
  //   )

  //   console.log(helper.result())
  // })

  // it('should support property variable', () => {
  //   const foo = new Function( // eslint-disable-line
  //     'elementOpen',
  //     'elementClose',
  //     'text',
  //     'state',
  //     complie(`
  //       {{ each state.list as value i }}
  //         <li>{{i}}. {{value}}</li>
  //       {{ /if }}
  //     `)
  //   )

  //   helper.clear()
  //   foo(
  //     helper.elementOpen,
  //     helper.elementClose,
  //     helper.text,
  //     { list: ['hello', 'world'] }
  //   )

  //   console.log(helper.result())
  // })

  it('should support property variable', () => {
    console.log(complie('<p data-aaa="test"></p>'))
  })
})
