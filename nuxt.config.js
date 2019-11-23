const { getConfigForKeys } = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'CTF_PERSON_ID'
])
const { createClient } = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

const TITLE = 'sansan'
const DESCRIPTION =
  '備忘録/技術ブログです。その他デザイン、数学、図書館のことなども。vue.jsやRailの勉強をしています。'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#00acc2' },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      },
      {
        property: 'og:site_name',
        content: TITLE
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: TITLE
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: DESCRIPTION
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/prism.js',
    { src: '~/plugins/vue-parallax-js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  generate: {
    routes() {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID
        }),
        // get the blog post content type
        cdaClient.getContentType(ctfConfig.CTF_BLOG_POST_TYPE_ID)
      ]).then(([entries, postType]) => {
        return [
          // map entries to URLs
          ...entries.items.map((entry) => `/blog/${entry.fields.slug}`),
          // map all possible tags to URLs
          ...postType.fields
            .find((field) => field.id === 'tags')
            .items.validations[0].in.map((tag) => `/tags/${tag}`)
        ]
      })
    }
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    '@nuxtjs/dotenv',
    'nuxt-mq',
    'nuxt-fontawesome'
  ],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    use: ['markdown-it-table-of-contents', 'markdown-it-emoji'],
    highlight: (code, lang) => {
      const Prism = require('prismjs')
      return Prism.highlight(
        code,
        Prism.languages[lang] || Prism.languages.markup
      )
    }
  },
  mq: {
    defaultBreakpoint: 'default',
    breakpoints: {
      sm: 450,
      md: 980,
      lg: Infinity
    }
  },
  styleResources: {
    scss: ['~/assets/scss/_index.scss']
  },
  webfontloader: {
    google: {
      families: ['Roboto', 'Lato', 'Noto+Sans+JP']
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID
  }
}
