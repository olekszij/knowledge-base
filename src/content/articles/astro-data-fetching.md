---
title: "Как получать данные в компонентах Astro"
description: "Узнайте, как нативно загружать данные из API, CMS и баз данных прямо в компонентах Astro."
date: 2026-09-13
category: "Guides"
tags:
  - Astro
  - Data Fetching
  - API
coverImage:
  src: "/images/articles/astro-data-fetching.jpg"
  alt: "Обложка"
draft: false
---

# Как получать данные в компонентах Astro

Получение данных в Astro происходит невероятно просто, поскольку компоненты Astro имеют доступ к `await` на верхнем уровне. Вам не нужны сложные хуки вроде `useEffect` или функции `getServerSideProps`; вы можете писать обычный JavaScript/TypeScript прямо в блоке скрипта компонента.

## Await на верхнем уровне

В Astro блок кода в верхней части вашего `.astro` файла (ограниченный `---`) выполняется на сервере во время сборки (или во время запроса, если используется SSR). Это означает, что вы можете безопасно получать данные, не раскрывая API-ключи клиенту.

```astro
---
// src/components/UserList.astro

// Это выполняется на сервере!
const response = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await response.json();
---

<ul>
  {users.map((user) => (
    <li>{user.name} - {user.email}</li>
  ))}
</ul>
```

## Получение данных из CMS (например, Keystatic)

Если вы используете локальную CMS или коллекции контента (Content Collections), вам даже не нужен `fetch`. Вы можете использовать встроенный API Astro `getCollection`.

```astro
---
import { getCollection } from 'astro:content';

// Получить все статьи из коллекции 'articles'
const allArticles = await getCollection('articles');

// Отфильтровать черновики
const publishedArticles = allArticles.filter(article => !article.data.draft);
---

<div class="grid">
  {publishedArticles.map(article => (
    <a href={`/articles/${article.id}`}>
      <h2>{article.data.title}</h2>
    </a>
  ))}
</div>
```

## Переменные окружения и безопасность

Поскольку скрипты компонентов Astro выполняются на сервере, это идеальное место для использования приватных переменных окружения (например, паролей от базы данных или секретных API-токенов).

```astro
---
// Этот токен в безопасности! Он НИКОГДА не будет отправлен в браузер.
const API_TOKEN = import.meta.env.SECRET_API_TOKEN;

const response = await fetch('https://api.mysecuredata.com/v1/info', {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});
const secureData = await response.json();
---

<div>{secureData.message}</div>
```

Если вам нужно, чтобы переменная окружения была доступна на стороне клиента (например, внутри React-компонента для отслеживания аналитики), вам нужно добавить к ней префикс `PUBLIC_`.

```text
// файл .env
SECRET_PASSWORD=supersecret      # Доступно только во frontmatter Astro
PUBLIC_ANALYTICS_ID=UA-123456    # Доступно везде, включая клиентский JS
```

## Заключение

Получение данных в Astro так же просто, как написание стандартного асинхронного JavaScript. Благодаря `await` на верхнем уровне и серверному рендерингу (SSR), загрузка данных происходит быстро, безопасно и отлично подходит для SEO прямо из коробки!
