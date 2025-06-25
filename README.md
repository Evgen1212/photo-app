# Photo App

Веб-приложение для просмотра фотографий с API jsonplaceholder, построенное на Vue 3 с использованием Composition API, Pinia и Tailwind CSS.

## Возможности

- 📸 Загрузка фотографий с API jsonplaceholder
- 🔍 Фильтрация по ID альбомов
- 📊 Таблица с сортировкой по всем колонкам
- ♾️ Бесконечная прокрутка (пагинация)
- 🌓 Переключение тем (светлая/тёмная/системная)
- 💾 Сохранение настроек в localStorage
- 🎯 Tooltip для обрезанного текста
- 📱 Адаптивный дизайн

## Технологии

- **Vue 3** - Composition API
- **Pinia** - управление состоянием
- **Tailwind CSS v4** - стилизация
- **Vite** - сборщик проекта

## Установка и запуск

```sh
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Структура проекта

```
src/
├── components/          # Vue компоненты
│   ├── PhotoFilter.vue  # Фильтр по альбомам
│   ├── PhotoTable.vue   # Таблица с данными
│   ├── ThemeToggle.vue  # Переключатель темы
│   └── GlobalTooltip.vue # Глобальный tooltip
├── store/              # Pinia stores
│   ├── index.js        # Конфигурация Pinia
│   └── photos.js       # Store для фотографий
├── assets/             # Статические ресурсы
└── App.vue             # Главный компонент
```

## API

Приложение использует [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) для получения данных о фотографиях.

## Деплой

### Vercel (рекомендуется)
1. Создайте аккаунт на [vercel.com](https://vercel.com)
2. Подключите GitHub репозиторий
3. Vercel автоматически определит настройки для Vue проекта
