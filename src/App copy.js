import { useEffect, useState, createContext } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

import productsData from './data/products.json'
import catsData from './data/cats.json'

export const AppContext = createContext(null)

function App() {

  const [products, setProducts] = useState(productsData)

  // Формирую список категорий для фильтра
  // на старте 'all'
  const cats = ['all']

  // Далее добавляю категории из товаров в cats
  productsData.forEach((product) => {
    if (!cats.includes(product.cat)) {
      cats.push(product.cat)
    }
  })

  const [filter, setFilter] = useState({
    category: 'all',
    price: {
      min: 10000,
		  max: 200000
    },
    memory: [],
    color: []
  })

  useEffect(() => {
    setProducts(function () {
      let filteredItems = []

      // Фильтр по категории
      filteredItems = productsData.filter( (product) => {
        if (filter.category === 'all') {
          return true
        } else {
          return filter.category === product.cat 
        }
      })

      // Фильтр по цене
      filteredItems = filteredItems.filter( (product) => {
        if (product.price >= filter.price.min && product.price <= filter.price.max) {
          return true
        }
      })

      // Фильтр по памяти
      filteredItems = filteredItems.filter( (product) => {
        if (filter.memory.length === 0) {
          return true
        }
        if(filter.memory.includes(product.memory)) {
          return true 
        }
      })

      // Фильтр по цвету
      filteredItems = filteredItems.filter( (product) => {
        if (filter.color.length === 0) {
          return true
        }
        if(filter.color.includes(product.color)) {
          return true 
        }
      })
      return filteredItems
    })
  }, [filter])

  return (
    <div className="App">
      <AppContext.Provider value={{ filter, setFilter }}>
        <Header/>
        <Main 
          products={products} 
          catsData={catsData}
          cats={cats} 
        />
        <Footer/>
      </AppContext.Provider> 
    </div>
  );
}

export default App;
