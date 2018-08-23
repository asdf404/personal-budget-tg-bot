const url = require('url')
const { POSTGRES_URL } = process.env

if (POSTGRES_URL) {
  const Sequelize = require('sequelize')
  const sequelize = (() => {
    const mysql = url.parse(POSTGRES_URL)
    const [ user, pass ] = mysql.auth.split(':')
    const db = mysql.pathname.slice(1)

    return new Sequelize(db, user, pass, {
      host: mysql.host,
      port: mysql.port,
      dialect: 'postgres',
      protocol: 'postgres',
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      pool: {
        maxConnections: 5,
        maxIdleTime: 30
      },
      // disable annoying deprecation warning
      // see https://github.com/sequelize/sequelize/issues/8417
      operatorsAliases: Sequelize.Op,
      logging: false // dump sql query to stdout
    })
  })()

  module.exports.sequelize = sequelize
}
