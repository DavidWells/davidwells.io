const resolve = module => require.resolve(module)

const CSS_PATTERN = /\.css$/
const MODULE_CSS_PATTERN = /\.module\.css$/
const GLOBAL_CSS_PATTERN = /\.global\.css$/

const getOptions = (pluginOptions) => {
  const options = { ...pluginOptions }

  delete options.plugins

  const postcssPlugins = options.postCssPlugins

  if (postcssPlugins) {
    options.plugins = postcssPlugins
  }

  delete options.postCssPlugins

  return options
}

const isCssRules = (rule) => {
  const { test } = rule
  return test &&
  (test.toString() === CSS_PATTERN.toString() || test.toString() === MODULE_CSS_PATTERN.toString())
}


const findCssRules = config => {
  return config.module.rules.find(rule => {
    return Array.isArray(rule.oneOf) && rule.oneOf.every(isCssRules)
  })
}

exports.onCreateWebpackConfig = ({ actions, stage, loaders, getConfig }, pluginOptions) => {
  const isProduction = !stage.includes('develop')
  // console.log('isProduction', isProduction)
  // console.log('pluginOptions', pluginOptions)
  const isSSR = stage.includes('html')
  const config = getConfig()
  const cssRules = findCssRules(config)
  const postcssOptions = getOptions(pluginOptions)
  const postcssLoader = {
    loader: resolve('postcss-loader'),
    options: {
      sourceMap: !isProduction,
      ...postcssOptions
    },
  }
  const postcssRule = {
    test: GLOBAL_CSS_PATTERN,
    use: isSSR
      ? [loaders.null()]
      : [loaders.css({ importLoaders: 1 }), postcssLoader],
  }
  const postcssRuleModules = {
    test: CSS_PATTERN,
    use: [
      loaders.css({
        modules: true,
        importLoaders: 1,
      }),
      postcssLoader,
    ],
    exclude: GLOBAL_CSS_PATTERN
  }

  if (!isSSR) {
    postcssRule.use.unshift(loaders.miniCssExtract())
    postcssRuleModules.use.unshift(loaders.miniCssExtract())
  }

  const postcssRules = { oneOf: [] }

  if (stage === 'develop' || stage === 'build-javascript' || stage === 'build-html' || stage === 'develop-html') {
    postcssRules.oneOf.push(...[postcssRuleModules, postcssRule])
  }

  if (cssRules) {
    cssRules.oneOf.unshift(...postcssRules.oneOf)
    actions.replaceWebpackConfig(config)
  } else {
    actions.setWebpackConfig({ module: { rules: [postcssRules] } })
  }
}
