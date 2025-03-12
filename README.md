# Дипломный проект на курсе Fullstack-разработчик на JavaScript»

## Cайт-агрегатор просмотра и бронирования гостиниц

### Цель проекта

Цель дипломного проекта - разработать фронтенд- и бэкенд-части для сайта-агрегатора с реализацией возможности бронирования гостиниц на диапазон дат. Проект подытожит навыки, которые вы получили в рамках прохождения курса, этот проект вы сможете добавить в свое портфолио разработчика.

### Руководство по проекту:

- Клонируем проект:

    **"git clone https://github.com/Shpalkin/DPJS.git**

- Переходим в папку проекта (должен быть запущен DOCKER):
        выполняем **docker compose up**

- После выполнения доступны:

        localhost:3000 - fromtend

        localhost:4000 - backend

        localhost:27017 - mongodb

- Реализация и доступы:
    По умолчанию реализованы доступы:
    
    Admin - role: 'admin' - login: admin@mail.ru; password: admin@mail.ru;

    Manager - role: 'manager' - login: manager@mail.ru; password: manager@mail.ru;

    Client - role: 'client' - login: client@mail.ru; password: client@mail.ru;

    По умолчанию добавлены гостиницы и номера.