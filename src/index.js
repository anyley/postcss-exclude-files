//@flow
import postcss from 'postcss'
import multimatch from 'multimatch'


const ERROR_PLUGIN_TYPE = 'The plugins parameter must be function or object or Array'
const ERROR_FILTER_ERROR = 'The filter parameter must be a glob string or an array of glob strings'

const getValueType: (any) => {
  oneOf: (...string[]) => boolean,
  is: (string) => boolean,
} = (value) => {
  let type: string = typeof value

  if (type === 'object' && Array.isArray(value)) {
    type = 'array'
  }

  return {
    oneOf: (...types) => types.includes(type),
    is: valType => valType === type,
  }
}

export default postcss.plugin('postcss-exclude-files', opts => {
  const { filter, plugins } = opts

  if (!getValueType(filter)
    .oneOf('string', 'array')) {
    throw new TypeError(ERROR_FILTER_ERROR)
  }

  const pluginType = getValueType(plugins)

  if (!plugins || !pluginType.oneOf('function', 'object', 'array')) {
    throw new TypeError(ERROR_PLUGIN_TYPE)
  }

  return (root, result) => {
    let path = root.source.input.file

    if (multimatch(path, filter).length === 0) {
      const handler = response => response.messages.forEach(msg => result.messages.push(msg))

      return postcss(pluginType.is('function') ? [plugins] : plugins)
        .process(root)
        .then(handler)
    }
  }
})
