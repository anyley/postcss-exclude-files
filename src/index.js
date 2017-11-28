import postcss from 'postcss'
import multimatch from 'multimatch'


const error = () => {
  throw new TypeError('The plugins parameter must be function or object or Array')
}

export default postcss.plugin('postcss-exclude-files', opts => {
  const { filter, plugins } = opts || {}

  if (typeof filter !== 'string' && !Array.isArray(filter)) {
    throw new TypeError('The filter parameter must be a glob string or an array of glob strings')
  }

  const typeOfPlugin = typeof plugins

  if (!plugins || typeOfPlugin !== 'function' && typeOfPlugin !== 'object' && !Array.isArray(plugins)) {
    error()
  }

  return (root, result) => {
    let path = root.source.input.file

    if (multimatch(path, filter).length === 0) {
      if (typeof plugins === 'function') {
        return postcss([plugins]).process(root).then(response =>
          response.messages.forEach(msg => result.messages.push(msg))
        )
      } else if (Array.isArray(plugins) || typeof plugins === 'object') {
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
