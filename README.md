# Short Url

Проект позволяет сокращать длинные ссылки более коротким вариантом.

## Архитектура

<details close>
  <summary>
    C4 - Context
  </summary>

  ![C4 - Context](docs/images/context.png)
</details>

<details close>
  <summary>
    C4 - Container
  </summary>

  ![C4 - Container](docs/images/container.png)
</details>

## Запуск

Для запуска выпоняем команду:

```
docker compose up -d
```

## Подключение к базе данных

```
docker exec -it short_url_db bash
psql -h <host> -U <user> -d <db>

# chose db
\c short_url_db

# show tables
\dt
```