const url = require('url')
require('dotenv').config()

const db = url.parse(process.env.POSTGRES_URL)
const [ username, password ] = db.auth.split(':')
const { host, port } = db
const database = db.pathname.slice(1)

const config = {
  username, password, database, host, port, dialect: 'postgres'
}

module.exports = {
  production: config,
  development: config,
  testing: config
}
