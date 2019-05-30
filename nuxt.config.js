const SITE_NAME = 'oneQ'
const TITLE = `${SITE_NAME} [oneQ] - 1日1答、あなたが見えてくる`
const DESC = 'oneQは毎日oen Questionされるインタビューサービスです'
const KEYWORDS = 'oenq,ワンキュー,イッキュー,質問,インタビュー,自己紹介,キュレーター'
const DEV_BASE_URL = 'http://localhost:3333'
const BASE_URL = 'https://couch.id'
const OGIMG_URL = `${BASE_URL}/ogimg_1.png` // 1200x630
const TWITTER_ID = '@acmikan43' // @[ Twitter ID]
 // const FACEBOOK_APP_ID = '' // App-ID（15文字の半角数字）
 // const FACEBOOK_PAGE_URL = ''  // FacebookページのURL

module.exports = {
  manifest: {
    name: SITE_NAME,
    lang: 'ja',
    short_name: SITE_NAME,
    title: TITLE,
    'og:title': TITLE,
    description: DESC,
    'og:description': DESC,
    theme_color: '#f2f2f2',
    background_color: '#f2f2f2',
    display: 'standalone'
  },
  env: {
    dev: (process.env.NODE_ENV !== 'production'),
    baseUrl: BASE_URL,
    devBaseUrl: DEV_BASE_URL,
    siteName: process.env.SITE_NAME || SITE_NAME,
    title: process.env.TITLE || TITLE,
    description: process.env.DESC || DESC,
    ogimgURL: process.env.OGIMG_URL || OGIMG_URL
  },
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: DESC },
      { hid: 'keywords', name: 'keywords', content: KEYWORDS, 'xml:lang': 'ja', lang: 'ja' },
      { hid: 'og:site_name', name: 'og:site_name', content: SITE_NAME },
      // { hid: 'fb:app_id', name: 'fb:app_id', content: FACEBOOK_APP_ID },
      // { hid: 'article:publisher', name: 'article:publisher', content: FACEBOOK_PAGE_URL },
      { hid: 'twitter:site', name: 'twitter:site', content: TWITTER_ID },
      { hid: 'twitter:title', name: 'twitter:title', content: TITLE },
      { hid: 'twitter:card', name: 'twitter:card', content: "summary_large_image" },
      { hid: 'twitter:image', name: 'twitter:site', content: OGIMG_URL },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', content: TITLE },
      { hid: 'og:description', name: 'og:description', content: DESC },
      { hid: 'og:image', name: 'og:image', content: OGIMG_URL },
      { hid: 'og:url', name: 'og:url', content: BASE_URL },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#f2f2f2' },
      { hid: 'theme-color', name: 'theme-color', content: '#ffffff' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: SITE_NAME },
      { hid: 'application-name', name: 'application-name', content: SITE_NAME },
      { hid: 'msapplication-config', name: 'msapplication-config', content: `${BASE_URL}/browserconfig.xml` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${BASE_URL}/favicon.ico` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `${BASE_URL}/apple-touch-icon.png` },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${BASE_URL}/favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${BASE_URL}/favicon-16x16.png` },
      { rel: 'mask-icon', href: `${BASE_URL}/safari-pinned-tab.svg`, color: '#000000' },
      { rel: 'shortcut icon', href: `${BASE_URL}/favicon.ico` }
    ]
  },
  modules: [
   ['nuxt-buefy', {
     // css: false,
     // materialDesignIcons: false
   }],
 ],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
