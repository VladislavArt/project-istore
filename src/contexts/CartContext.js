import {createContext, useState, useEffect} from 'react'
import { fetchProducts } from './../api';
import useLocalStorage from '../hooks/useLocalStorage';

export const CartContext = createContext()

const CartProvider = ({children}) => {
	// Cart sidebar
	const [cartOpen, setCartOpen] = useState(false)

	// Cart
	// const [cart, setCart] = useState([]) // [{id: 1, count: 2}, {id: 5, count: 1}]
	const [cart, setCart] = useLocalStorage('cart', [])

	// Cart Items
	const [items, setItems] = useState(null)

	//totalCount && totalAmount
	const [totalCount, setTotalCount] = useState(0)
	const [totalAmount, setTotalAmount] = useState(0)

	// На основе корзины, получаю данные о продуктах с API и записываю в состояние items для отображения
	useEffect(()=> {
		// http://localhost:4000/products?id=6&id=8 Пример запроса

		// Если корзина пуста, запрос не делаем
		if(!cart.length) {
			setItems([])
			return
		}

		// Если не пуста, формируем параметры запроса и делаем запрос
		let params = ''

		cart.forEach((item)=> {
			if(!params) {
				params += '?id=' + item.id
			} else {
				params += '&id=' + item.id
			}
		})

		fetchProducts(params).then((data)=> {
			const dataWithCount = data.map((item)=> {
				const cartEl = cart.find((cartItem)=> {
					return cartItem.id === item.id
				})
				return {
					...item,
					count: cartEl.count
				}
			})
			setItems(dataWithCount)
		})
	}, [cart])

	// Подсчет общей стоимости и количества
	useEffect(()=> {
		let count = 0
		let amount = 0

		if(!items) return

		items.forEach((item)=> {
			count += item.count
			amount += item.count * item.price
		})

		setTotalCount(count)
		setTotalAmount(amount)
	}, [items])

	// Добавление товара в корзину
	const addToCart = (product)=> {
			const newCart = () => {
				const productExists = cart.some((item)=> item.id === product.id)
				if(productExists) {
					const newCart = cart.map((item)=> {
						if(item.id === product.id) {
							return {
								...item,
								count: item.count + 1
							}
						}
						return item
					})
					return newCart
				} else {
						const newCart = [...cart, {id: product.id, count: 1}]
						return newCart
				}
			}

		setCart(newCart)
		// setCartOpen(true)
	}

	// Remove from Cart
	const removeFromCart = (id) => {
		const newCart = cart.filter((item)=> item.id !== id)
		setCart(newCart)
	}

	// Increase Count
	const increaseCount = (id)=> {
		const newCart = cart.map((cartItem) => {
			if(cartItem.id !== id) return cartItem
			return {
				...cartItem,
				count: cartItem.count + 1
			}
		})
		setCart(newCart)
	}

	// Decrease Count
	const decreaseCount = (id) => {
		const cartItem = cart.find((el)=> el.id === id)

		// Если кол-во менее 2, то есть 1, значит удаляем товар из корзины
		if(cartItem.count < 2) {
			removeFromCart(id)
			return
		}

		if(cartItem) {
			const newCart = cart.map((item)=> {
				if(item.id !== id) return item
				return {
					...item,
					count: item.count - 1
				}
			})
			setCart(newCart)
		}
	}

	return (
		<CartContext.Provider 
			value = {{ 
				cart, 
				setCart, 
				addToCart, 
				items, 
				totalCount, 
				totalAmount, 
				increaseCount, 
				decreaseCount,
				cartOpen,
				setCartOpen
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider