import { serverPath } from "../helpers/variables"

export const fetchProducts = async (params = '') => {
  try {
    const response = await fetch(serverPath + 'products/' + params)
    if(!response.ok) throw new Error('Ошибка получения продуктов')
    return response.json()
  } catch(error) {
      console.log(error)
  } 
}

export const fetchCats = async () => {
  try {
    const response = await fetch(serverPath + 'categories')
    if(!response.ok) throw new Error('Ошибка получения категорий')
    return response.json()
  } catch (error) {
      console.log(error)
  }
}

// Filter
export const fetchFilterValues = async () => {
  try {
    const response = await fetch(serverPath + 'filterValues')
    if(!response.ok) throw new Error('Ошибка получения значений фильтра')
    return response.json()
  } catch(error) {
      console.log(error)
  }
}

export const fetchProduct = async (id = '') => {
  try {
    const response = await fetch(serverPath + 'products/' + id)
    if(!response.ok) throw new Error('Ошибка получения продукта')
    return response.json()
  } catch(error) {
      console.log(error)
  } 
}

export const createOrder = async (order)=> {
  try {
    const response = await fetch(serverPath + 'orders/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    if(!response.ok) throw new Error('Ошибка создания заказа')
    const data = await response.json()
    return data
  } catch(error) {
    console.log(error)
  }
}