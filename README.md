# Personal Budget bot

Telegram bot that helps you to record and control your money spending. Now it supports only russian rubles (RUB).

You can deploy your own bot (as described below) or use existing one: [@asdf_personal_budget_bot](https://t.me/asdf_personal_budget_bot).

## Bot commands

```
/help — help
<amount> [<hashtag>, ...] [<comment>] — add new entry, e.g. '150 #food #burger #cola Burger and cola'. <hashtag> and <comment> is optional
/revert — soon
/report — soon
/dump — soon
```

Example usage:

```
YOU: 100 #food #burger #cola Burger and cola in my favorite place
BOT: Added 100RUB
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

## License

BSD
