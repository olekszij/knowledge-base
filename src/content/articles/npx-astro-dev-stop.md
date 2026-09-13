---
title: "Перезапуск dev-сервера Astro (npx astro dev stop)"
description: "Как правильно остановить и перезапустить локальный dev-сервер Astro"
date: 2026-09-12
category: "Astro"
tags:
  - astro
coverImage:
  src: "/images/articles/npx-astro-dev-stop.jpg"
  alt: "Обложка"
draft: false
featured: false
---
Запустите его заново (на всякий случай с флагом --force, чтобы Vite точно пересобрал зависимости):

```bash
npx astro dev --background --force
```

После этого обновите страницу http://localhost:4321/keystatic, и админка должна загрузиться без ошибок!
