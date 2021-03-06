import postcss from 'postcss'

export default postcss.plugin('test-plugin', () => root => {
  const prefixes = ['-ms-', '-webkit-']

  root.walkDecls(decl => {
    if (decl.prop === 'display') {
      if (typeof decl.value === 'string') {
        prefixes.forEach(prefix => decl.cloneBefore({
          value: prefix + decl.value
        }))
      }
    }
  })
})
