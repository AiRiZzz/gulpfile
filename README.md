# Сборка проекта

### Структура файлов
```
gulpfile
│   README.md
│   gulpfile.js
│   package.json
└─── src
    ├─── html
    │   │   index.html
    │   └─── tpl
    ├─── scss
    │   │   main.scss
    │   │   core.scss
    │   └─── core
    ├─── js
    │   │   main.js
    │   │   plugin.js
    │   └─── plugin
    ├─── img
    └─── fnt
```

### Установка и инициализация
```
npm up

gulp init
```

### Билд

 - Пересоздает каталог `build`

```
gulp build
```
```
gulpfile
└─── src
    │   index.html
    │   page.html
    ├─── css
    │   │   style.css (main.scss)
    │   │   min.css (core.scss)
    ├─── js
    │   │   script.js (main.js)
    │   │   min.js (plugin.js)
    ├─── img
    └─── fnt
```
### Первый старт

 - Пересоздает каталог `build`
 - Запсукает сервер
 - Подключает отслеживание изменений в файлах

```
gulp start
```

### Старт

 - Запсукает сервер
 - Подключает отслеживание изменений в файлах

```
gulp
```

### Удаление

 - Удаляет каталог `build`

```
gulp clear
```
или
```
gulp clean
```
