# Тестовое задание "Курсы"
Бэк написан на WT, запросы на диалекте T-SQL. Должен работать на любом сервере, т.к. не были использованы кастомные каталоги.
На localhost фронте авторизация через куки.
О фронте - сильно дробить на компоненты не стал, использовал `vuetify` для пагинации, таблиц и выпадающих списков.
!!! Пагинация генерится на бэке (почти полностью запросом) для того, чтобы фронт не страдал.
## 1) Настроить сервер
Создать веб шаблон с кодом `course_methods_api` и положить туда код из файла в папке `wt`
Настроить узел на авторизацию через куки

## 2) Создать файл .env по примеру .env.example
Который содержит логин, пароль и URL сервера. При сборке не понадобится, т.к. нужен для окружения `NODE_ENV=development`

## 3) Поставить зависимости

## 4) Выполнить npm run serve

____________________________________________________________________
## Возможная проблема
Если на сервере включена проверка сессии, то курс может выдать ошибку `"Session id is incorrect"`, поскольку в данной реадизации ссылка генерится для localhost, а открывается на портале с тютором (разные сессии). Пробовал подменять ID сессии (взял с response куков), не помогло. Дальше копать не стал, так что просто подшаманил в файле wt/course_launch.html и кура заработал :)

## Демонстрация:
![Alt Text](https://github.com/89hikari/course_page_test_task/blob/main/example.gif?raw=true)