require('dotenv').config()

// check for all neccessary env vars
;[ 'POSTGRES_URL', 'TELEGRAM_TOKEN' ].forEach(key => {
  if (!process.env[key]) throw new Error(`Environment variable ${key} is not present`)
})

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  const nodemon = require('nodemon')
  nodemon({
    script: './src/bot.js',
    ext: 'js',
    exec: 'node --harmony'
  })

  nodemon
    .on('restart', function (files) {
      console.log('app restarted due to:', ...files)
    })
} else {
  require('./src/bot')
}
