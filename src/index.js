import postcss from 'postcss'
import multimatch from 'multimatch'


export default postcss.plugin('postcss-exclude-files', opts => {
  const { filter, plugins } = opts || {}

  if (typeof filter !== 'string' && !Array.isArray(filter)) {
    throw new TypeError('The filter parameter must be a glob string or an array of glob strings')
  }

  const typeOfPlugin = typeof plugins

  if (!plugins || typeOfPlugin !== 'function' && typeOfPlugin !== 'object' && !Array.isArray(plugins)) {
    throw new TypeError('The plugins parameter must be function or object or Array')
  }

  return (root, result) => {
    if (multimatch(root.source.input.file, filter).length === 0) {
      if (typeof plugins === 'function') {
        //return plugins().process(root).then(response =>
        //  response.messages.forEach(msg => result.messages.push(msg))
        //)
        //if (typeof plugins.processs === 'function') {
        //  console.log('11111')
          return postcss([plugins]).process(root).then(response =>
            response.messages.forEach(msg => result.messages.push(msg))
          )
        //} else {
        //  console.log('22222', plugins, typeof plugins)
        //  return postcss([plugins()]).process(root).then(response =>
        //    response.messages.forEach(msg => result.messages.push(msg))
        //  )
        //}
      } else if (Array.isArray(plugins) || typeof plugins === 'object') {
        //const pluginList = plugins.map(plugin => {
        //  if (plugins.hasOwnProperty('process') && typeof plugins.processs === 'function') {
        //    return plugin()
        //  } else {
        //    return plugin
        //  }
        //})
        return postcss(plugins).process(root).then(response =>
          response.messages.forEach(msg => result.messages.push(msg))
        )
      } else {
        error()
      }
    }

    result.messages.push({
      type:   'warning',
      text:   `File "${root.source.input.file}" excluded`,
      plugin: 'postcss-exclude-files'
    })
  }
})

//postcssExcludeFiles.process = (css, opts) => {
//  opts = opts || { filter: '**/node_modules/**', plugins: [] }
//  const processor = postcss([postcssExcludeFiles(opts)])
//  return processor.process(css, opts)
//}

//module.exports = postcssExcludeFiles
