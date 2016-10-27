exports = module.exports = {
  openTag: '{{',   // 逻辑语法开始
  closeTag: '}}',  // 逻辑语法结束
  escape: true,    // 是否编码输出变量的 HTML 字符
  cache: true,     // 是否开启缓存（依赖 options 的 filename 字段）
  compress: false, // 是否压缩输出
  parser: null,    // 自定义语法格式器
  config: (config) => {
    Object.assign(exports, config)
  },
}
