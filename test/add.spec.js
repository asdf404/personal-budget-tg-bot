const assert = require('assert')
const handlers = require('../src/handlers')
const { User, Entry } = require('../src/models')
const botMock = require('./bot-mock')

const TELEGRAM_ID = '1'

describe('new entry', () => {
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

  context('user sends simple message', () => {
    before(setup)
    after(teardown)

    const bot = botMock()

    before(async () => {
      await handlers.add(bot)(
        {
          from: { id: TELEGRAM_ID },
          text: '100'
        }
      )
    })

    it('creates new entry', async () => {
      const entry = await Entry.find({ where: { userId: user.id } })
      assert.strictEqual(entry.value, '100.00')
      assert.strictEqual(entry.comment, '')
    })

    it('sends message back', () => {
      assert.strictEqual(bot.sendMessage.args[0][0], TELEGRAM_ID)
      assert.strictEqual(bot.sendMessage.args[0][1], 'Added: 100.00RUB')
    })
  })

  context('user sends messaage with hashtags and comment', () => {
    before(setup)
    after(teardown)

    const bot = botMock()

    before(async () => {
      await handlers.add(bot)(
        {
          from: { id: TELEGRAM_ID },
          text: '200 hello #test world'
        }
      )
    })

    it('creates new entry', async () => {
      const entry = await Entry.find({ where: { userId: user.id } })
      assert.strictEqual(entry.value, '200.00')
      assert.strictEqual(entry.comment, 'hello #test world')
      assert.deepStrictEqual(entry.tags, [ '#test' ])
    })

    it('sends message back', () => {
      assert.strictEqual(bot.sendMessage.args[0][0], TELEGRAM_ID)
      assert.strictEqual(bot.sendMessage.args[0][1], 'Added: 200.00RUB')
    })
  })

  context('user sends messaage without value', () => {
    before(setup)
    after(teardown)

    const bot = botMock()

    before(async () => {
      await handlers.add(bot)(
        {
          from: { id: TELEGRAM_ID },
          text: 'wrong'
        }
      )
    })

    it('creates nothing', async () => {
      const entry = await Entry.find({ where: { userId: user.id } })
      assert(!entry)
    })

    it('sends message back', () => {
      assert.strictEqual(bot.sendMessage.args[0][0], TELEGRAM_ID)
      assert.strictEqual(bot.sendMessage.args[0][1], 'I don\'t understand you')
    })
  })
})
