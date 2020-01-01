import path from 'path'
import CKEditorWebpackPlugin from '@ckeditor/ckeditor5-dev-webpack-plugin'
import { styles } from '@ckeditor/ckeditor5-dev-utils'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'

require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (title) =>
      title ? `${title} - ${process.env.APP_TITLE}` : process.env.APP_TITLE,
    title: process.env.APP_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#33aaff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/style/common/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/nuky-editor', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://www.npmjs.com/package/@nuxtjs/moment
    '@nuxtjs/moment',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ['~/assets/style/variables.scss']
  },
  proxy: {
    '/api/': 'http://localhost:8080/'
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: true,
    extractCSS: true,
    optimizeCSS: true,
    // transpile: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          }
        }),
        new OptimizeCssAssetsWebpackPlugin({})
      ]
    },
    splitChunks: {
      layouts: true
    },
    plugins: [
      new CKEditorWebpackPlugin({
        language: 'en'
      })
    ],
    postcss: styles.getPostCssConfig({
      minify: true,
      themeImporter: {
        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
      }
    }),
    babel: {
      plugins: [
        [
          'prismjs',
          {
            languages: ['javascript', 'css', 'markup', 'java', 'bash', 'sql'],
            plugins: ['line-numbers', 'copy-to-clipboard', 'show-language'],
            css: true
          }
        ]
      ]
    },
    extend(config, { isClient }) {
      config.devtool = isClient ? 'eval-source-map' : 'inline-source-map'

      const filesRuleIndex = config.module.rules.findIndex((item) => {
        return `${item.test}` === '/\\.(png|jpe?g|gif|svg|webp)$/i'
      })
      if (filesRuleIndex !== -1) {
        config.module.rules[filesRuleIndex].test = /\.(png|jpe?g|gif|webp)$/
        const svgRule = config.module.rules[filesRuleIndex]
        svgRule.test = /\.svg/
        svgRule.exclude = svgRule.exclude || []
        svgRule.exclude.push(path.join(__dirname, 'node_modules', '@ckeditor'))
        config.module.rules.push(svgRule)
      }
      config.module.rules.push({
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      })
    }
  },
  /**
   * router config
   */
  router: {},
  render: {
    resourceHints: false
  },
  /**
   * moment.js config
   */
  moment: {
    defaultLocale: 'en',
    locales: ['zh-hk', 'zh-tw', 'ja', 'zh-cn']
  }
}
