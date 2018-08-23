const { BIGINT, STRING, DATE } = require('sequelize')
const { sequelize } = require('../db')

const User = sequelize.define('user', {
  id: {
    type: BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  telegramId: {
    type: STRING(32),
    allowNull: false,
    field: 'telegram_id'
  },
  createdAt: {
    type: DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DATE,
    field: 'updated_at'
  },
  deletedAt: {
    type: DATE,
    allowNull: true,
    field: 'deleted_at'
  }
}, {
  tableName: 'users',
  paranoid: true
})

module.exports = User
