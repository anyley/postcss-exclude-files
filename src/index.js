import postcss from 'postcss'
import multimatch from 'multimatch'


const error = () => {
  throw new TypeError('The postcssPlugin parameter must be function! or Array')
}

const postcssExcludeFiles = postcss.plugin('postcss-exclude-files', ({ filter, plugins }) =>
  (root, result) => {
    if (typeof filter !== 'string' && !Array.isArray(filter)) {
      throw new TypeError('The filter parameter must be a glob string or an array of glob strings!')
    }

    if (multimatch(root.source.input.file, filter).length === 0) {
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
      type: 'warning',
      text: `File "${root.source.input.file}" excluded`,
      plugin: 'postcss-exclude-files'
    })
  }
)

postcssExcludeFiles.process = (css, opts) => {
  opts = opts || { filter: '**/node_modules/**', plugins: [] }
  const processor = postcss([postcssExcludeFiles(opts)])
  return processor.process(css, opts)
}

module.exports = postcssExcludeFiles
