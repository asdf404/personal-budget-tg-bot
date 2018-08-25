const assert = require('assert')
const handlers = require('../src/handlers')
const { User, Entry } = require('../src/models')
const botMock = require('./bot-mock')

const TELEGRAM_ID = '1'

describe('revert entry', () => {
  let user = null
  async function setup () {
    user = await User.create({
      telegramId: TELEGRAM_ID
    })
  }
  async function teardown () {
    await Promise.all([
      User.destroy({ where: {}, force: true }),
      Entry.destroy({ where: {}, force: true })
    ])
  }

  context('user reverts last entry', () => {
    before(setup)
    after(teardown)

    const bot = botMock()

    let beforeRevert
    let afterRevert
    before(async () => {
      await Entry.create({
        value: 100,
        currency: 'RUB',
        userId: user.id
      })
      beforeRevert = await Entry.create({
        value: 200,
        currency: 'RUB',
        userId: user.id
      })
      await handlers.revert(bot)({ from: { id: TELEGRAM_ID } })
      afterRevert = await Entry.find({ where: { id: beforeRevert.id } })
    })

    it('creates new entry', async () => {
      assert(!afterRevert)
    })

    it('sends message back', () => {
      assert.strictEqual(bot.sendMessage.args[0][0], TELEGRAM_ID)
      assert.strictEqual(bot.sendMessage.args[0][1], 'Reverted: 200.00RUB')
    })
  })
})
