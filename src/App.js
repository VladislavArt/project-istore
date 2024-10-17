import { useEffect, useState, useContext, createContext } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { fetchProducts, fetchCats, fetchFilterValues } from './api/index'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Main from './pages/Main/Main'
import Product from './pages/Product/Product';
import Cart from './components/Cart/Cart';

import { CartContext } from './contexts/CartContext';
import Order from './pages/Order/Order';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

export const AppContext = createContext(null)

function App() {
  const { cartOpen } = useContext(CartContext)

  const [products, setProducts] = useState(null)
  const [cats, setCats] = useState(null)
  const [filterValues, setFilterValues] = useState(null)

  const [pageError, setPageError] = useState(null)
  const [pageLoading, setPageLoading] = useState(null)

  const [filter, setFilter] = useState({
    category: null,
    price: {
      min: null,
		  max: null
    },
    memory: [],
    color: [],
    sort: ''
  })

  const resetFilter = () => {
    setFilter({
			category: null,
			price: {
        min: filterValues.price.min,
        max: filterValues.price.max
      },
			memory: [],
			color: [],
			sort: ''
		})
  }

  // First fetching data
  useEffect(()=> {
    setPageLoading(true)
    setTimeout(()=> {
      Promise.all([fetchProducts(), fetchCats(), fetchFilterValues()]).then((values)=> {
        const [products, cats, filterValues] = values
        !products.error && setProducts(products)
        !cats.error && setCats(cats)
        !filterValues.error && setFilterValues(filterValues)
      }).catch((error)=> {
        console.log('Ошибка при получении данных', error)
        setPageError(true)
      }).finally(()=> {
        setPageLoading(false)
      })
    }, 500)
  }, [])

  useEffect(()=> {
    let params = '?'

    // Проверка на категорию
    if(filter.category && filter.category.slug !== 'all') {
      params += 'cat=' + filter.category.slug
    }

    // Проверка на цену
    if(filter.price.min) {
      params += '&price_gte=' + filter.price.min
    }

    if(filter.price.max) {
      params += '&price_lte=' + filter.price.max
    }

    // Проверка на объём памяти
    if(filter.memory.length) {
      for(const memory of filter.memory) {
        params += '&memory=' + memory
      }
    }

    // Проверка на цвет
    if(filter.color.length) {
      for(const color of filter.color) {
        params += '&color=' + color
      }
    }

    if(filter.sort) {
      const sortDirection = filter.sort === 'priceAsc' ? 'asc' : 'desc'
      params += '&_sort=price&_order=' + sortDirection
    }

    fetchProducts(params).then((productsData) => {
      if(Array.isArray(productsData)) {
        setProducts(productsData)
      }
    })

  }, [filter])

  useEffect(() =>{
    cats && setFilter((prev)=> {
      return {
        ...prev,
        category: cats[0]
      }
    })
  }, [cats])

  useEffect(() =>{
    filterValues && setFilter((prev)=> {
      return {
        ...prev,
        price: {
          min: filterValues.price.min,
          max: filterValues.price.max
        }
      }
    })
  }, [filterValues])

  return (
    <div className="App">
      <AppContext.Provider 
      value={{ 
        filterValues, 
        filter, 
        setFilter, 
        products, 
        cats, 
        resetFilter 
        }}
      >
        
        <BrowserRouter>
          <Header resetFilter={resetFilter} />
          {cartOpen && <Cart />}
          <Routes>
            <Route
              path='/' 
              element={ 
                <MainLayout pageLoading={pageLoading} pageError={pageError} /> 
              }
            >
              <Route index element={<Main />} />
              <Route 
                path='product/:productId' 
                element={ <Product /> }
              />
            </Route>  
            <Route
              path='order'
              element={ <Order /> }
            />
            <Route
              path='orderSuccess'
              element={ <OrderSuccess /> }
            />
          </Routes>
          <Footer />
        </BrowserRouter>

      </AppContext.Provider>
    </div>
  )
}

export default App;
