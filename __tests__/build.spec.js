import excludeFiles from '../dist/'
import postcss from 'postcss'
import testPlugin from '../helpers/plugin'

let css, target

beforeAll(() => {
  css = 'div { display: flex; }'
  target = 'div { display: -ms-flex; display: -webkit-flex; display: flex; }'
})

describe('when test-plugin used without exclude files wrapper', () => {
  test('test-plugin can be function and produce prefixed css', () => {
    const prefixed = postcss([testPlugin()]).process(css)

    return expect(prefixed).resolves.toMatchObject({
      css: target
    })
  })

  test('test-plugin can be initializer and produce prefixed css', () => {
    const prefixed = postcss([testPlugin]).process(css)

    return expect(prefixed).resolves.toMatchObject({
      css: target
    })
  })

  test('test-plugin can processing without postcss and produce prefixed css', () => {
    const prefixed = testPlugin.process(css)

    return expect(prefixed).resolves.toMatchObject({
      css: target
    })
  })
})


describe('when other plugins wrapped by exclude files plugin with invalud options', () => {
  test('filter parameter must be a glob string or an array of glob strings', () => {
    const invalidFilters = [NaN, null, undefined, 0, 1, true, false, {}]

    invalidFilters.forEach(filter => {
      const result = () => excludeFiles({
        filter,
        plugins: testPlugin()
      })

      expect(result).toThrow('The filter parameter must be a glob string or an array of glob strings')
    })
  })

  test('plugins parameter must be (function | arrray | object)', () => {
    const invalidPlugins = [NaN, null, undefined, 0, 1, true, false, 'bad plugin']

    invalidPlugins.forEach(plugins => {
      const result = () => excludeFiles({
        filter: '',
        plugins
      })

      expect(result).toThrow('The plugins parameter must be function or object or Array')
    })
  })
})

describe('when other pligins wrapped by exclude files plugin and css pass to processing', () => {
  test('plugin can be a function', () => {
    expect.hasAssertions()

    const result = postcss([
      excludeFiles({
        filter:  '',
        plugins: testPlugin()
      })
    ]).process(css)

    return expect(result).resolves.toMatchObject({
      css: target
    })
  })

  test('plugin can be a initializer', () => {
    expect.hasAssertions()

    const result = postcss([
      excludeFiles({
        filter:  '',
        plugins: testPlugin
      })
    ]).process(css)

    return expect(result).resolves.toMatchObject({
      css: target
    })
  })

  test('plugin can be a postcss bundle and initializer', () => {
    expect.hasAssertions()

    const result = postcss([
      excludeFiles({
        filter:  '',
        plugins: [
          postcss([testPlugin])
        ]
      })
    ]).process(css)

    return expect(result).resolves.toMatchObject({
      css: target
    })
  })

  test('plugin can be a postcss bundle and function', () => {
    expect.hasAssertions()

    const result = postcss([
      excludeFiles({
        filter:  '',
        plugins: [
          postcss([testPlugin()])
        ]
      })
    ]).process(css)

    return expect(result).resolves.toMatchObject({
      css: target
    })
  })
})
