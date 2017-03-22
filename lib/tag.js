/* eslint-disable */
const HTML_BLOCK = 'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, table, tr, td, th, link'
const INLINE = 'a, abbr, acronym, audio, b, button, basefont, bdo, big, br, canvas, cite, code, command, datalist, dfn, em, embed, font, i, img, input, keygen, kbd, label, mark, meter, output, progress, q, rp, rt, ruby, s, samp, select, small, span, strike, strong, sub, sup, textarea, time, tt, u, var, video, wbr, option'
const BLOCK = 'address, article, aside, blockquote, center, dir, div, dd, details, dl, dt, fieldset, figcaption, figure, form, footer, frameset, h1, h2, h3, h4, h5, h6, hr, header, hgroup, isindex, menu, nav, noframes, noscript, ol, p, pre, section, summary, ul, li, thead, tbody, iframe'
/* eslint-enable */
const W3CTAG = (() => {
  const res = {}
  ;[HTML_BLOCK, INLINE, BLOCK] // eslint-disable-line
    .join(', ').split(', ').forEach((tagName) => {
      res[tagName] = true
    })
  return res
})()

module.exports = tagname => { // eslint-disable-line
  return !W3CTAG[tagname]
}

