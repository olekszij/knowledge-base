---
title: npx astro dev stop
description: "How to stop and restart the Astro dev server"
date: 2026-09-12
category: Astro
tags:
  - astro
draft: false
featured: false
---
Запустите его заново (на всякий случай с флагом --force, чтобы Vite точно пересобрал зависимости):
bash
npx astro dev --background --force
После этого обновите страницу http://localhost:4321/keystatic, и админка должна загрузиться без ошибок!
