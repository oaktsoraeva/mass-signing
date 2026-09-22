# UI-кит Точки для прототипирования

React-компоненты в стиле Точки для **вайбкодинга** — собираешь прототипы в Cursor или Claude, описывая экран словами.

> Не продакшен-дизайн-система. Только прототипы и эксперименты.

**Репозиторий:** https://gitlab.tochka-tech.com/design-community/ai-learning/design-system

---

## Вайбкодинг

**Суть:** клонируешь UI-кит, агент читает [`AGENTS.md`](./AGENTS.md) и собирает **самодостаточное приложение-прототип** в отдельной папке рядом с репозиторием.

```text
projects/
  design-system/       ← UI-кит (этот репозиторий)
  profile-settings/    ← твой прототип (своё Vite-приложение)
```

Каталог компонентов онлайн, если нужно свериться:  
https://design-community.pages.tochka-tech.com/ai-learning/design-system/

### Подготовка (один раз)

```
Клонируй UI-кит Точки:
https://gitlab.tochka-tech.com/design-community/ai-learning/design-system

git clone, npm install в папке design-system.
Прочитай AGENTS.md.
```

### Сборка прототипа

```
Собери прототип: [описание экрана].

Создай самодостаточное Vite-приложение в папке ../<имя-прототипа>/ рядом с design-system.
За основу — design-system/prototypes/_template/.

AGENTS.md — источник правды. Компоненты из design-system/src/, только токены UI-кита.
```

**Пример:**

```
Собери прототип экрана настроек профиля в ../profile-settings/:
PageLayout, аватар, поля «Имя» и «Email», FormCell со Switch, Footer с кнопкой «Сохранить».
Шаблон — prototypes/_template/, правила — AGENTS.md.
```

---

## Справочник

| Что | Где |
|---|---|
| Правила для агента | [`AGENTS.md`](./AGENTS.md) |
| Шаблон прототипа | [`prototypes/_template/`](./prototypes/_template/) |
| Витрина (опционально) | [GitLab Pages](https://design-community.pages.tochka-tech.com/ai-learning/design-system/) |

## Компоненты

- [**AccordeonCell**](./src/components/AccordeonCell/) — ячейка с раскрывающимся содержимым
- [**ActionFormCell**](./src/components/ActionFormCell/) — ячейка формы с действием
- [**ActionSheet**](./src/components/ActionSheet/) — нижняя панель действий
- [**Alert**](./src/components/Alert/) — короткое текстовое уведомление (success, error, neutral)
- [**Avatar**](./src/components/Avatar/) — аватар пользователя
- [**Badge**](./src/components/Badge/) — бейдж количества
- [**Button**](./src/components/Button/) — кнопка с вариантами (primary, secondary, transparent, white)
- [**Cell**](./src/components/Cell/) — базовая ячейка списка
- [**CellLeftAccessory**](./src/components/CellLeftAccessory/) — левый аксессуар ячейки
- [**CellRightAccessory**](./src/components/CellRightAccessory/) — правый аксессуар ячейки
- [**Checkbox**](./src/components/Checkbox/) — чекбокс
- [**Chip**](./src/components/Chip/) — чип/тег с опциональной иконкой
- [**ContextMenu**](./src/components/ContextMenu/) — контекстное меню
- [**ContextualNotification**](./src/components/ContextualNotification/) — контекстное уведомление с иконкой, действием и кнопкой закрытия
- [**Drawer**](./src/components/Drawer/) — выезжающая панель
- [**Dropdown**](./src/components/Dropdown/) — выпадающий список
- [**FeedbackBanner**](./src/components/FeedbackBanner/) — баннер обратной связи
- [**Footer**](./src/components/Footer/) — фиксированный подвал страницы с кнопками действий
- [**FormCell**](./src/components/FormCell/) — ячейка формы со свитчером, чекбоксом или радио
- [**FlowResultView**](./src/components/FlowResultView/) — экран результата флоу (успех / ошибка / ожидание), используется внутри Modal/Drawer
- [**HeaderButton**](./src/components/HeaderButton/) — кнопка или группа кнопок под заголовком страницы
- [**Input**](./src/components/Input/) — текстовое поле ввода
- [**LinearProgress**](./src/components/LinearProgress/) — линейный индикатор прогресса
- [**LinkCell**](./src/components/LinkCell/) — ячейка-ссылка с заголовком, описанием и индикатором загрузки
- [**MainPageNavigationBar**](./src/components/MainPageNavigationBar/) — главная навигационная панель сайта
- [**Modal**](./src/components/Modal/) — модальное окно
- [**NavigationBar**](./src/components/NavigationBar/) — навигационная панель страницы с заголовком
- [**PageAction**](./src/components/PageAction/) — строка действия или перехода на странице
- [**PageLayout**](./src/components/PageLayout/) — базовый макет страницы с навигацией и опциональной правой панелью
- [**PromoPageBanner**](./src/components/PromoPageBanner/) — крупный визуальный блок-шапка для промо-страниц
- [**PromoPageCard**](./src/components/PromoPageCard/) — карточка для контентного наполнения промо-страниц
- [**PromoPageHorizontalCard**](./src/components/PromoPageHorizontalCard/) — горизонтальная карточка на всю ширину для промо-страниц
- [**Radio**](./src/components/Radio/) — радиокнопка для единичного выбора
- [**Spinner**](./src/components/Spinner/) — анимированный индикатор загрузки
- [**Switch**](./src/components/Switch/) — переключатель между двумя состояниями
- [**Table**](./src/components/TableCell/) — грид-обёртка для таблицы из ячеек
- [**TableCell**](./src/components/TableCell/) — ячейка таблицы с заголовком, описанием, тегом и аксессуарами
- [**TabsCarousel**](./src/components/TabsCarousel/) — горизонтальный скроллируемый список табов с анимацией переключения и поддержкой бейджей
- [**Tag**](./src/components/Tag/) — метка статуса или категории
- [**TextArea**](./src/components/TextArea/) — многострочное поле ввода
- [**Tooltip**](./src/components/Tooltip/) — всплывающая подсказка
- [**Widget**](./src/components/Widget/) — блок-контейнер с заголовком и зоной для контента
- [**WidgetTitle**](./src/components/WidgetTitle/) — шапка виджета с заголовком и правым аксессуаром

---

## Для разработчиков

### Требования

- Node.js 18+
- npm
- Git

### Клонирование и запуск

```bash
git clone https://gitlab.tochka-tech.com/design-community/ai-learning/design-system.git
cd design-system
npm install
```

Витрина компонентов (каталог в `demo/`):

```bash
npm run dev              # http://localhost:5173
npm run build:demo       # сборка в demo/dist/
npm run preview:demo     # просмотр собранной витрины
npm run type-check       # проверка TypeScript
```

### Структура репозитория

```text
design-system/
  src/              ← компоненты и токены
  demo/             ← витрина (каталог компонентов)
  prototypes/       ← шаблон для прототипов вайбкодинга
  AGENTS.md         ← гайд для AI-агента
```

Импорт в коде прототипа:

```tsx
import { Button, Input } from '../design-system/src'
import { Circle } from '../design-system/src/icons'
```

Стили — по образцу [`prototypes/_template/src/index.css`](./prototypes/_template/src/index.css).

Прототипы — отдельные приложения рядом с репозиторием, см. [`prototypes/README.md`](./prototypes/README.md).  
Новый компонент в UI-кит — [`NewComponent.md`](./NewComponent.md).  
Превью на витрине — [`demo/README.md`](./demo/README.md).

## Лицензия

MIT
