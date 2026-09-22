# Demo Preview Guide

Инструкция по добавлению и поддержке превью в папке `demo/`.

## Структура

- `App.tsx` — корневой переключатель вкладок демо
- `App.css` — общие layout-классы и стили страницы демо
- `index.css` — базовые стили страницы и токены
- `preview/StylesPreview.tsx` — токены и типографика
- `preview/IconsPreview.tsx` — иконки
- `preview/AtomsPreview.tsx` — атомы (Button, Input, …)
- `preview/ComponentsPreview.tsx` — составные компоненты
- `preview/OverlaysPreview.tsx` — Modal, Drawer, ActionSheet, PageLayout
- `preview/PromoPreview.tsx` — промо-блоки

## Импорт компонентов в demo

Импортируй напрямую из `src/`:

```tsx
import { Button, Input } from '../../src'
import { Circle } from '../../src/icons'
```

## Как добавить новое превью

1. Создай или обнови файл в `demo/preview/`
2. Экспортируй React-компонент превью
3. Подключи его в `demo/App.tsx`
4. Добавь кнопку вкладки в `tab-nav`, если это новая категория
5. Переиспользуй demo-классы из `App.css`
6. Проверь отображение: `npm run dev`
7. Прогони `npm run type-check`

## Базовый шаблон секции

```tsx
{/* Матрица вариаций: лейбл + 3 колонки */}
<section className="component-screen">
  <div className="preview-grid preview-grid--matrix">
    <h1 className="component-screen__title ts-600-2xl">Component Name</h1>
    <div className="preview-grid__header ts-500-m">Variant A</div>
    <div className="preview-grid__header ts-500-m">Variant B</div>
    <div className="preview-grid__header ts-500-m">Variant C</div>

    <div className="preview-grid__label ts-500-m">Default</div>
    <ComponentA />
    <ComponentB />
    <ComponentC />
  </div>
</section>

{/* Инспектор: панель контролов + компонент */}
<section className="component-screen">
  <h1 className="component-screen__title ts-600-2xl">Component Name</h1>
  <div className="preview-grid preview-grid--inspector">
    <div className="preview-controls">...</div>
    <div className="preview-stage">
      <MyComponent />
    </div>
  </div>
</section>
```

## Что переиспользовать в первую очередь

### Общие блоки

- `component-screen` — базовая карточка секции
- `component-screen--flex` — секция с несколькими колонками рядом
- `preview-grid` — базовая сетка для превью
- `preview-grid__header` — заголовки колонок
- `preview-grid__label` — подписи строк

### Модификаторы сеток

**`preview-grid--matrix`** — матрица вариаций: лейбл-колонка + N контентных колонок.

**`preview-grid--inspector`** — панель контролов слева (`320px`) + компонент справа.

### Повторяющиеся паттерны

- `preview-control-stack` — вертикальный стек для интерактивного демо
- `preview-control-stack__bar` — контейнер фиксированной ширины
- `preview-control-row` — строка с подписью и контролом
- `preview-control-row__fill` — элемент на оставшуюся ширину
- `preview-stack-group` — вертикальная группа на всю ширину

## Проверка перед завершением

- превью открывается в правильной вкладке
- сетка не поехала на текущих брейкпоинтах
- отступы соответствуют соседним секциям
- `npm run type-check` проходит без ошибок
