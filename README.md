# Массовое подписание

Прототип сценария массового подписания документов в ЭДО Точки.

```text
mass-signing/    ← сам прототип, описание сценария в его README
design-system/   ← UI-кит Точки, подключается из соседней папки
```

## Запуск

```bash
cd mass-signing
npm install
npm run dev
```

## Деплой

Vercel собирает прототип командами из `vercel.json`: ставит зависимости
и билдит `mass-signing`, раздаёт `mass-signing/dist`.
