**🌐 [Русский](#-playwright-автотесты-для-интернет-магазина) | [English](#-playwright-autotests-for-an-online-store)**

---

# 🛒 Playwright автотесты для интернет-магазина

Репозиторий содержит набор автоматизированных тестов на базе **[Playwright](https://playwright.dev/)** для веб-приложения интернет-магазина.

Тесты покрывают основные пользовательские сценарии:

- 📝 регистрация
- 🔐 авторизация
- 🗂 каталог товаров
- 🛍 корзина
- 📦 оформление заказа
- 👤 работа с профилем и меню

Веб-приложение (фронтенд + бэкенд + БД) запускается локально через **Docker** и собирается из отдельного репозитория. Автотесты запускаются локально или в CI (**GitHub Actions**) после полной подъёмки инфраструктуры.

---

## 📑 Содержание

- [Связь с веб-приложением](#-связь-с-веб-приложением)
- [Требования](#-требования)
- [Установка и настройка проекта автотестов](#️-установка-и-настройка-проекта-автотестов)
- [Локальный запуск веб-приложения через Docker](#-локальный-запуск-веб-приложения-через-docker)
- [Запуск автотестов](#-запуск-автотестов)
- [Просмотр отчётов Allure](#-просмотр-отчётов-allure)
- [Структура проекта](#-структура-проекта)
- [Настройка CI/CD (GitHub Actions)](#-настройка-cicd-github-actions)
- [Рекомендации по разработке новых тестов](#-рекомендации-по-разработке-новых-тестов)
- [Cсылка на отчет](#-ссылка-на-отчет)

---

## 🔗 Связь с веб-приложением

| Компонент              | Описание                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Репозиторий приложения | [`Qdrat/site_4_interns-feature-intermediate_version`](https://github.com/Qdrat/site_4_interns-feature-intermediate_version) |

Для локального запуска используется `docker-compose`, который поднимает все сервисы одной командой.

Автотесты выполняются по адресу `http://localhost:5173` (описано в `playwright.config.js` через `baseURL`).

---

## ✅ Требования

- **Node.js** — версия LTS (18+), рекомендуется `lts/*` (например, 20.x)
- **pnpm** — менеджер пакетов (версия 9.x). Автотесты используют `npm`, но приложение требует `pnpm`
- **Docker** и **docker-compose** — для подъёма приложения локально
- **Git** — для клонирования репозиториев

---

## ⚙️ Установка и настройка проекта автотестов

**1. Клонируйте репозиторий с автотестами:**

```bash
git clone https://github.com/Qdrat/Final-QA.git
cd Final-QA
```

**2. Установите зависимости:**

```bash
npm ci
```

**3. Установите браузеры для Playwright:**

```bash
npx playwright install --with-deps
```

**4. Настройте переменные окружения (опционально):**

- По умолчанию `baseURL` в `playwright.config.js` указывает на `http://localhost:5173/`.
- Если вы меняете порты, отредактируйте конфигурацию.

---

## 🐳 Локальный запуск веб-приложения через Docker

Чтобы автотесты могли взаимодействовать с приложением, его необходимо поднять локально. Процесс автоматизирован (аналогично тому, как это делается в CI):

```bash
# Клонируем репозиторий приложения (если ещё не сделано)
git clone https://github.com/Qdrat/site_4_interns-feature-intermediate_version.git ./app

# Переходим в папку приложения
cd ./app

# Устанавливаем pnpm (если не установлен глобально)
corepack enable pnpm   # или npm install -g pnpm

# Устанавливаем зависимости приложения
pnpm install

# Поднимаем все сервисы через docker-compose
pnpm full-setup        # эта команда запускает docker-compose up -d и выполняет миграции/сиды
```

После выполнения приложение будет доступно по адресу `http://localhost:5173`.

> 💡 **Примечание:** в CI мы применяем патч для `docker-compose exec` (отключаем TTY), чтобы скрипты работали в неинтерактивном режиме. При локальном запуске это не требуется.

---

## 🚀 Запуск автотестов

Все тесты находятся в папке `tests/`. В проекте используются Page Object'ы и фикстуры для удобства.

### Основные команды

| Команда               | Описание                                            |
| --------------------- | --------------------------------------------------- |
| `npm test`            | Запустить все тесты в headless-режиме (параллельно) |
| `npm run test:headed` | Запустить все тесты с открытым браузером (headed)   |
| `npm run test:debug`  | Запустить тесты в режиме отладки (с инспектором)    |
| `npm run lint`        | ESLint                                              |
| `npm run lint:fix`    | ESLint auto-fix                                     |
| `npm run forma`       | Prettier write                                      |

---

## 📊 Просмотр отчётов Allure

Сгенерируйте отчёт (после прогона тестов):

```bash
npm run allure:generate
```

Откройте его в браузере:

```bash
npm run allure:open
```

---

## 🗂 Структура проекта

```text
.
├── .github/workflows/          # CI/CD пайплайны (GitHub Actions)
│   └── playwright.yml
├── src/
│   ├── data/                   # Тестовые данные (usersData, USER_TYPES)
│   ├── factories/              # Фабрики для генерации пользователей (UserFactory)
│   ├── fixtures/               # Фикстуры для Playwright (auth, логин)
│   ├── pages/                  # Page Object'ы (LoginPage, InventoryPage, CartPage ...)
│   └── components/             # UI-компоненты (Header)
├── tests/ui/                      # Файлы с тест-кейсами
│   ├── login.spec.js
│   ├── register.spec.js
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   └── menu_logout.spec.js
├── playwright.config.js        # Конфигурация Playwright
├── package.json                # Зависимости и скрипты
├── .eslintrc.js                # Линтер
├── .prettierrc                 # Форматтер
└── README.md
```

---

## 🔄 Настройка CI/CD (GitHub Actions)

В репозитории настроен автоматический пайплайн (файл `.github/workflows/playwright.yml`), который выполняет:

1. **Линтинг и проверку форматирования** (ESLint + Prettier).
2. **Клонирование приложения** из внешнего репозитория.
3. **Подъём всех сервисов** через `pnpm full-setup`.
4. **Ожидание готовности фронтенда** (проверка через `curl`).
5. **Запуск Playwright-тестов** (параллельно, с повторными прогонами при падении).
6. **Генерацию Allure-отчёта** и его публикацию как артефакта.
7. **Деплой Allure-отчёта** на GitHub Pages (для веток `main`/`master`).
8. **Отправку уведомления в Telegram** о статусе прогона со ссылкой на отчёт.

---

## 💡 Рекомендации по разработке новых тестов

- Используйте существующие Page Object'ы (`LoginPage`, `CartPage` и др.) для повторного использования.
- Для генерации тестовых данных применяйте `UserFactory` (например, для регистрации новых пользователей).
- Для проверки всплывающих уведомлений используйте общий метод `toast()` из `BasePage`.

---

## 🔗 Ссылка на отчет

- [Report](https://qdrat.github.io/Final-QA/)

---

Если у вас возникли вопросы или предложения по улучшению тестов, создавайте **Issue** или **Pull Request**.

---

---

# 🛒 Playwright Autotests for an Online Store

This repository contains a set of automated tests built with **[Playwright](https://playwright.dev/)** for an online store web application.

The tests cover the main user scenarios:

- 📝 registration
- 🔐 authorization
- 🗂 product catalog
- 🛍 shopping cart
- 📦 checkout
- 👤 profile and menu interactions

The web application (frontend + backend + database) is run locally via **Docker** and is built from a separate repository. Autotests are run locally or in CI (**GitHub Actions**) after the infrastructure has fully started up.

---

## 📑 Contents

- [Connection to the Web Application](#-connection-to-the-web-application)
- [Requirements](#-requirements)
- [Installing and Configuring the Autotest Project](#️-installing-and-configuring-the-autotest-project)
- [Running the Web Application Locally via Docker](#-running-the-web-application-locally-via-docker)
- [Running the Autotests](#-running-the-autotests)
- [Viewing Allure Reports](#-viewing-allure-reports)
- [Project Structure](#-project-structure)
- [Setting up CI/CD (GitHub Actions)](#-setting-up-cicd-github-actions)
- [Recommendations for Writing New Tests](#-recommendations-for-writing-new-tests)
- [Report Link](#-report-link)

---

## 🔗 Connection to the Web Application

| Component              | Description                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Application repository | [`Qdrat/site_4_interns-feature-intermediate_version`](https://github.com/Qdrat/site_4_interns-feature-intermediate_version) |

For running locally, `docker-compose` is used, which spins up all the services with a single command.

Autotests run against `http://localhost:5173` (specified in `playwright.config.js` via `baseURL`).

---

## ✅ Requirements

- **Node.js** — LTS version (18+), `lts/*` recommended (e.g., 20.x)
- **pnpm** — package manager (version 9.x). Autotests use `npm`, but the application requires `pnpm`
- **Docker** and **docker-compose** — for running the application locally
- **Git** — for cloning repositories

---

## ⚙️ Installing and Configuring the Autotest Project

**1. Clone the autotest repository:**

```bash
git clone https://github.com/Qdrat/Final-QA.git
cd Final-QA
```

**2. Install dependencies:**

```bash
npm ci
```

**3. Install Playwright browsers:**

```bash
npx playwright install --with-deps
```

**4. Configure environment variables (optional):**

- By default, `baseURL` in `playwright.config.js` points to `http://localhost:5173/`.
- If you change the ports, edit the configuration accordingly.

---

## 🐳 Running the Web Application Locally via Docker

For the autotests to interact with the application, it needs to be running locally. The process is automated (similarly to how it's done in CI):

```bash
# Clone the application repository (if not already done)
git clone https://github.com/Qdrat/site_4_interns-feature-intermediate_version.git ./app

# Go to the application folder
cd ./app

# Install pnpm (if not installed globally)
corepack enable pnpm   # or npm install -g pnpm

# Install application dependencies
pnpm install

# Bring up all services via docker-compose
pnpm full-setup        # this command runs docker-compose up -d and applies migrations/seeds
```

Once complete, the application will be available at `http://localhost:5173`.

> 💡 **Note:** in CI we apply a patch for `docker-compose exec` (disabling TTY) so the scripts work in non-interactive mode. This isn't needed for local runs.

---

## 🚀 Running the Autotests

All tests are located in the `tests/` folder. The project uses Page Objects and fixtures for convenience.

### Main Commands

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm test`            | Run all tests in headless mode (in parallel) |
| `npm run test:headed` | Run all tests with the browser open (headed) |
| `npm run test:debug`  | Run tests in debug mode (with inspector)     |
| `npm run lint`        | ESLint                                       |
| `npm run lint:fix`    | ESLint auto-fix                              |
| `npm run forma`       | Prettier write                               |

---

## 📊 Viewing Allure Reports

Generate the report (after running the tests):

```bash
npm run allure:generate
```

Open it in the browser:

```bash
npm run allure:open
```

---

## 🗂 Project Structure

```text
.
├── .github/workflows/          # CI/CD pipelines (GitHub Actions)
│   └── playwright.yml
├── src/
│   ├── data/                   # Test data (usersData, USER_TYPES)
│   ├── factories/              # Factories for generating users (UserFactory)
│   ├── fixtures/               # Playwright fixtures (auth, login)
│   ├── pages/                  # Page Objects (LoginPage, InventoryPage, CartPage ...)
│   └── components/             # UI components (Header)
├── tests/ui/                      # Test case files
│   ├── login.spec.js
│   ├── register.spec.js
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   └── menu_logout.spec.js
├── playwright.config.js        # Playwright configuration
├── package.json                # Dependencies and scripts
├── .eslintrc.js                # Linter
├── .prettierrc                 # Formatter
└── README.md
```

---

## 🔄 Setting up CI/CD (GitHub Actions)

The repository has an automated pipeline configured (file `.github/workflows/playwright.yml`) that performs:

1. **Linting and format checking** (ESLint + Prettier).
2. **Cloning the application** from the external repository.
3. **Bringing up all services** via `pnpm full-setup`.
4. **Waiting for the frontend to be ready** (checked via `curl`).
5. **Running Playwright tests** (in parallel, with retries on failure).
6. **Generating the Allure report** and publishing it as an artifact.
7. **Deploying the Allure report** to GitHub Pages (for the `main`/`master` branches).
8. **Sending a Telegram notification** about the run status with a link to the report.

---

## 💡 Recommendations for Writing New Tests

- Use the existing Page Objects (`LoginPage`, `CartPage`, etc.) for reuse.
- Use `UserFactory` to generate test data (e.g., for registering new users).
- Use the shared `toast()` method from `BasePage` to check pop-up notifications.

---

## 🔗 Report Link

- [Report](https://qdrat.github.io/Final-QA/)

---

If you have any questions or suggestions for improving the tests, please open an **Issue** or a **Pull Request**.
