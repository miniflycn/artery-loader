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

  // it('should support property variable', () => {
  //   console.log(complie(`
  //     <div class="trading-plg">
  //         {{if this.props.offer.bookedCount >= 10000}}
  //         <span class="text">近30天热销{{this.props.offer.bookedCount / 10000}}万笔</span>
  //         {{else if this.props.offer.bookedCount < 10000 && this.props.offer.bookedCount > 0}}
  //         <span class="text">近30天热销{{this.props.offer.bookedCount}}笔</span>
  //         {{else}}
  //         <span class="text fd-hide">暂无成交</span>
  //         {{/if}}
  //     </div>
  //   `).output)
  // })

//   it('should xxx', () => {
//     console.log(complie(`
//       <div>
//     <span>{{this.props.name}}</span>
//     {{each this.props.list as item i}}
//       <p>{{item.label}}</p>
//       {{each this.props.col as col j}}
//       <span>{{col.name}}===</span>
//       {{/each}}
//     {{/each}}

//     <div onClick={{this.ed}}>hello click me</div>
// </div>
//     `).output)
//   })
  it('should xxx', () => {
    console.log(complie(`
      <span>hello&nbsp;world</span>
    `).output)
  })
})
