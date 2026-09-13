---
title: "Краткое руководство по деплою на Netlify"
description: "Пошаговая инструкция по деплою вашего современного сайта на Astro в Netlify менее чем за две минуты."
date: 2026-09-09
category: "Other"
tags: ["deployment", "hosting", "netlify"]
coverImage:
  src: "/images/articles/deploying-to-netlify.jpg"
  alt: "Обложка"
draft: false
featured: false
---

# Краткое руководство по деплою на Netlify

Netlify — это одна из ведущих платформ хостинга для Jamstack-приложений. Деплой (развертывание) вашего проекта Astro там происходит невероятно просто.

## Шаги для деплоя

1. **Запушьте свой код на GitHub:** Убедитесь, что ваш проект Astro закоммичен и отправлен в репозиторий на GitHub.
2. **Войдите в Netlify:** Перейдите на [netlify.com](https://www.netlify.com/) и нажмите "Add new site" -> "Import an existing project".
3. **Подключитесь к GitHub:** Разрешите Netlify доступ к вашим репозиториям и выберите нужный проект.
4. **Настройте параметры сборки:** Netlify достаточно умен, чтобы автоматически определить Astro. Настройки по умолчанию должны быть такими:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Деплой:** Нажмите кнопку деплоя и подождите несколько секунд.

Ваш сайт теперь доступен глобально в Edge-сети Netlify! Если вы добавили SSR-адаптер (например, `@astrojs/netlify`), ваши динамические API-маршруты будут автоматически преобразованы в функции Netlify (Netlify Functions).
