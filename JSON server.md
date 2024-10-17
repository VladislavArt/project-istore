# Запуск на нужном порту
npx json-server ./src/data/db.json --port 4000

# Все продукты
http://localhost:4000/products

# Получить товар по id
http://localhost:4000/products?id=3

# Фильтрация по цене
http://localhost:4000/products?price_gte=20000&price_lte=100000

# Выборка по категории
http://localhost:4000/products?cat=comp

# Выборка по цвету
http://localhost:4000/products?color=white

# Выборка по памяти
http://localhost:4000/products?memory=1 Tb

# Совмещенный фильтр

## Категория, память и цена
http://localhost:4000/products?cat=comp&memory=1 Tb&price_lte=90000

## Категория и цвет
http://localhost:4000/products?cat=comp&color=black

# Сортировка

Сортировка по цене(по возрастанию):
http://localhost:4000/products?_sort=price&_order=asc

Сортировка по цене(по убыванию):
http://localhost:4000/products?_sort=price&_order=desc

# Постраничная навигация (первые 3 продукта):
http://localhost:4000/products?_page=1&_limit=3

# Полнотекстовый поиск
http://localhost:4000/products?q=Mac

# Использование параметра title_like для поиска по полю title:
http://localhost:4000/products?title_like=Mac

