module.exports = {
  up: async function (queryInterface, Sequelize) {
    // `users` table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      telegram_id: {
        type: Sequelize.STRING(48),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    }, { charset: 'utf8' })
    await queryInterface.addIndex('users', [ 'telegram_id' ], {
      indexName: 'u_users_telegram_id',
      indicesType: 'UNIQUE'
    })

    // `entries` table
    await queryInterface.createTable('entries', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING(4),
        allowNull: false
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    }, { charset: 'utf8' })
    await queryInterface.addIndex('entries', [ 'user_id' ], {
      indexName: 'i_entries_user'
    })
    await queryInterface.addIndex('entries', [ 'tags' ], {
      indexName: 'i_entries_tags',
      using: 'GIN'
    })
  },

  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('entries')
  }
}
