# Personal Budget bot

Telegram bot that helps you to record and control your money spending. Now it supports only russian rubles (RUB).

You can deploy your own bot (as described below) or use existing one: [@asdf_personal_budget_bot](https://t.me/asdf_personal_budget_bot).

## Bot commands

```
/help — help
<amount> [<hashtag>, ...] [<comment>] — add new entry, e.g. '150 awesome #burger and #cola'. <hashtag> and <comment> is optional
/revert — soon
/report — soon
/dump — soon
```

Example usage:

```
YOU: 150 awesome #burger and #cola
BOT: Added 150RUB
YOU: 2000 Some wrong entry
BOT: Added 2000RUB
YOU: /revert
BOT: Reverted 2000RUB
YOU: /report week #food
BOT: <some cool report about #food>
YOU: /dump year json
BOT: <sends you a file>
```

## Usage with `docker-compose`

Create `.env` file:

```
TELEGRAM_TOKEN=123:my-token
```

Then create `docker-compose.yml`:

```
version: '3'

services:
  postgres:
    image: postgres:10.5
    restart: always
    environment:
      POSTGRES_USER: budget
      POSTGRES_PASSWORD: budget
      POSTGRES_DB: budget
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    networks:
      - default
  bot:
    image: asdf404/personal-budget-tg-bot:latest
    restart: always
    environment:
      TELEGRAM_TOKEN: ${TELEGRAM_TOKEN}
      POSTGRES_URL: postgres://budget:budget@postgres/budget
    depends_on:
      - postgres
    networks:
      - default

networks:
  default: {}
```

And start it:

```
$ docker-compose up -d
```

## Developemnt and testing

Create `config-testing.yml`:

```
version: '3'

services:
  postgres:
    volumes:
      - ./data/postgres_test:/var/lib/postgresql/data
  bot:
    build:
      context: ./bot # path to source code of bot
      dockerfile: Dockerfile.dev
    command: [ 'npm', 'run', 'stub' ]
```

Start in test mode `docker-compose -f docker-compose.yml -f config-testing.yml up -d` and then run tests `docker-compose exec bot npm run test:watch`.

## License

BSD
