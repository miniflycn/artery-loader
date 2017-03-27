/* eslint-env mocha */
const complie = require('../lib')
const path = require('path')
const helper = require('../lib/test-helper')

describe('template', () => {
  it('should support property variable', () => {
    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      'state',
      complie(`
        <a href={{state.url}}>{{state.text}}</a>
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo(
      helper.elementOpen,
      helper.elementClose,
      helper.text,
      { url: 'http://1688.com', text: '1688' }
    )

    helper.result()
      .should
      .equal('<body ><a href="http://1688.com">1688</a></body>')
  })

  it('should support property variable', () => {
    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      'state',
      complie(`
        <div>
          {{ if state.admin === true }}
            <p>Hello</p>
        </div>
        <div>
          {{ /if }}
            <p>Daniel</p>
        </div>
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo(
      helper.elementOpen,
      helper.elementClose,
      helper.text,
      { admin: false }
    )

    helper.result()
      .should
      .equal('<body ><div ><p >Daniel</p></div></body>')
  })

  it('should support property variable', () => {
    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      'state',
      complie(`
        {{ each state.list as value i }}
          <li>{{i}}. {{value}}</li>
        {{ /if }}
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo(
      helper.elementOpen,
      helper.elementClose,
      helper.text,
      { list: ['hello', 'world'] }
    )

    helper.result()
      .should
      .equal('<body ><li >0. hello</li><li >1. world</li></body>')
  })

  it('should support property variable', () => {
    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      complie(`
        <div class="trading-plg">
          {{if this.props.offer.bookedCount >= 10000}}
          <span class="text">近30天热销{{this.props.offer.bookedCount / 10000}}万笔</span>
          {{else if this.props.offer.bookedCount < 10000 && this.props.offer.bookedCount > 0}}
          <span class="text">近30天热销{{this.props.offer.bookedCount}}笔</span>
          {{else}}
          <span class="text fd-hide">暂无成交</span>
          {{/if}}
      </div>
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo.call(
      {
        props: {
          offer: {
            bookedCount: 10000,
          },
        },
      },
      helper.elementOpen,
      helper.elementClose,
      helper.text
    )

    helper.result()
      .should
      .equal('<body ><div className="trading-plg"><span className="text">近30天热销1万笔</span></div></body>') // eslint-disable-line

    helper.clear()
    foo.call(
      {
        props: {
          offer: {
            bookedCount: 9999,
          },
        },
      },
      helper.elementOpen,
      helper.elementClose,
      helper.text
    )

    helper.result()
      .should
      .equal('<body ><div className="trading-plg"><span className="text">近30天热销9999笔</span></div></body>') // eslint-disable-line
  })

  it('should support property variable', () => {
    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      'state',
      complie(`
        {{each state.row as row}}
          {{each state.col as col}}
            hello {{row + ' ' + col}}
          {{/each}}
        {{/each}}
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo(
      helper.elementOpen,
      helper.elementClose,
      helper.text,
      { row: [1, 2, 3], col: [4, 5, 6] }
    )

    helper.result()
      .should
      .equal('<body >\n                  hello 1 4\n                  hello 1 5\n                  hello 1 6\n                  hello 2 4\n                  hello 2 5\n                  hello 2 6\n                  hello 3 4\n                  hello 3 5\n                  hello 3 6</body>')
  })

  it('should support child template props.children', () => {

    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      'state',
      'props',
      complie(`
        <div>
          <child>
            {{state.text}}
          </child>
        </div>
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo(
      helper.elementOpen,
      helper.elementClose,
      helper.text,
      { text: '1688' },
      {}
    )

    helper.result()
      .should.equal('<body ><div ><div >1688</div></div></body>')
  })

  it('should able fixed the attribute', () => {
    const foo = new Function( // eslint-disable-line
      'elementOpen',
      'elementClose',
      'text',
      complie(`
        <div>
          <p class="abc"></p>
          <video autoplay={{true}}></video>
        </div>
      `, path.join(__dirname, 'fragment')).output
    )

    helper.clear()
    foo(
      helper.elementOpen,
      helper.elementClose,
      helper.text
    )

    helper.result()
      .should.equal('<body ><div ><p className="abc"></p><video autoPlay="true"></video></div></body>')
  })
})
