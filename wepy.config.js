const path = require('path')
const prod = process.env.NODE_ENV === 'production'

const TransformPx2Rpx = function (opts = {}) {
  let def = {
    filter: new RegExp('.(wxss|wxml|json)$')
  }
  this.setting = Object.assign({}, def, opts)
}

TransformPx2Rpx.prototype.apply = function apply(op) {
  if (this.setting.filter.test(op.file)) {
    if (op.code) {
      op.code = op.code.replace(/\b(\d+(\.\d+)?)px\b/ig, function (match, $1) {
        return $1 * 2 + 'rpx'
      })
    }
  }
  op.next()
}

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    /* sass: {
      outputStyle: 'compressed'
    }, */
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
    /* autoprefixer: {
      filter: /\.wxss/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    } */
    rpx: {
      filter: /\.(wxss|wxml)$/
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
