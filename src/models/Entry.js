const { ARRAY, BIGINT, DECIMAL, STRING, TEXT, DATE } = require('sequelize')
const { sequelize } = require('../db')

const Entry = sequelize.define('entry', {
  id: {
    type: BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: BIGINT,
    allowNull: false,
    field: 'user_id'
  },
  currency: {
    type: STRING(4),
    allowNull: false
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false
  },
  tags: {
    type: ARRAY(STRING),
    defaultValue: []
  },
  comment: {
    type: TEXT,
    allowNull: true
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
  tableName: 'entries',
  paranoid: true
})

module.exports = Entry
