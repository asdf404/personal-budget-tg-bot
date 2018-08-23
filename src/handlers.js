const { uniq } = require('ramda')
const { User, Entry } = require('./models')
const regex = require('./regex')
const { Currencies } = require('./enums')
const { sequelize } = require('./db')

const HELP = `Accounting Helper

  Usage:
  \`/help\` — this help
  \`/revert\` — revert last entry
  \`<amount> [<comment with hashtags>]\` — add new entry, e.g. \`150 awesome #burger and #cola\`. Comment is optional. Hashtags using for grouping entries and making reports by categories.

  [Icon by monkik](https://www.flaticon.com/free-icon/calculator_755173)
`.split('\n').map(s => s.trim()).join('\n')

/**
 * Register user
 */
function start (bot, data) {
  const { from: { id } } = data
  return sequelize.transaction(async transaction => {
    const user = await User.find({
      where: { telegramId: String(id) },
      transaction
    })

    if (!user) {
      await User.create({ telegramId: id }, { transaction })
    }

    help(bot, data)
  })
}

async function help (bot, { from: { id } }) {
  bot.sendMessage(id, HELP, {
    parse_mode: 'markdown',
    disable_web_page_preview: true
  })
}

/**
 * Add Entry
 */
async function add (bot, data) {
  const matches = data.text.match(regex.entry)
  const value = parseFloat(matches[1].trim())
  const comment = (matches[2] || '').trim()
  const tags = uniq(comment.match(regex.tags) || [])

  const currency = Currencies.RUB.toString()
  const user = await User.find({ where: { telegramId: String(data.from.id) } })

  const entry = await Entry.create({
    userId: user.id,
    value,
    currency,
    tags,
    comment
  })

  bot.sendMessage(data.from.id, `Added: ${entry.value}RUB`)
}

async function report (bot, { from: { id } }) {
  bot.sendMessage(
    id,
    'reports is not available yet',
    {
      parse_mode: 'markdown',
      disable_web_page_preview: true
    }
  )
}

async function revert (bot, { from: { id } }) {
  bot.sendMessage(
    id,
    'revert is not available yet',
    {
      parse_mode: 'markdown',
      disable_web_page_preview: true
    }
  )
}

module.exports = {
  start: bot => (...args) => start(bot, ...args).catch(console.log),
  help: bot => (...args) => help(bot, ...args).catch(console.log),
  add: bot => (...args) => add(bot, ...args).catch(console.log),
  report: bot => (...args) => report(bot, ...args).catch(console.log),
  revert: bot => (...args) => revert(bot, ...args).catch(console.log)
}
