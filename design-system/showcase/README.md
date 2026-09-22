# Showcase

Витрина UI-кита Точки — живой каталог из папки [`demo/`](../demo/).

## Онлайн

Публикуется через **GitLab Pages** при пуше в default branch (job `create-pages`).

- URL в проекте: **Deploy → Pages**
- Ожидаемый адрес: https://design-community.pages.tochka-tech.com/ai-learning/design-system/

Вкладки: Стили, Иконки, Атомы, Компоненты, Промо, Оверлеи.

## Локально

Из корня репозитория:

```bash
npm install
npm run dev          # http://localhost:5173
npm run build:demo   # сборка в demo/dist/
npm run preview:demo # просмотр собранной витрины
```

Для Pages-сборки с правильным base path:

```bash
VITE_BASE_PATH=/ai-learning/design-system/ npm run build:demo
```

## Как добавить превью

См. [`demo/README.md`](../demo/README.md).
