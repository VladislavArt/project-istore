import { CartContext } from '../../contexts/CartContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CartItem from '../../components/CartItem/CartItem';

import { priceFormatter } from '../../utils/priceFormatter'

import style from './style.module.css'
import Button from '../../components/Button/Button';
import { createOrder } from '../../api';

function Order() {
	const navigate = useNavigate()

	const { items, totalCount, totalAmount, setCart } = useContext(CartContext)

	const [name, setName] = useState('Vladislav')
	const [email, setEmail] = useState('vladislav@mail.ru')

	const [formPending, setFormPending] = useState(false)
	
	const cartItemsHTML = ()=> {
		if(items && items.length) {
			return (
				<>
					<section className={style.items}>
						{items.map((item, index)=> {
							return <CartItem key={index} item={item} />
						})}
					</section>

					<section className={style.info}>
						<p>Итого: {totalCount}</p>
						<p>Стоимость: {priceFormatter.format(totalAmount)}</p>
					</section>
				</>
			)
		}
	}

	const formHandler = async (e)=> {
		console.log('formHandler')
		e.preventDefault()

		const order = {
			name: name,
			email: email,
			items: items
		}

		setFormPending(true)

		setTimeout(async ()=> {
			const data = await createOrder(order)
			console.log(data)
			if(Object.keys(data)) {
				setFormPending(false)
				setCart([])
				navigate('/orderSuccess')
			}
		}, 1000)
	}

	return (
		<article>
			<div className="container">
				<h1>Ваш заказ</h1>
				{cartItemsHTML()}
				<div className={style['order-form']}>
					<h1 className={style.title}>Оформить заказ</h1>
					<form action="" className={style.form}>
						<input
							disabled={formPending}
							type="text" 
							placeholder='Имя'
							className={style.input}
							value={name}
							onChange={(e)=> setName(e.target.value)}
						/>
						<input
							disabled={formPending}
							type="text" 
							placeholder='Email'
							className={style.input}
							value={email}
							onChange={(e)=> setEmail(e.target.value)}
						/>
						<Button
							disabled={formPending}
							title="Оформить заказ" 
							clickHandler={(e)=>{formHandler(e)}} 
						/>
					</form>
				</div>
			</div>
		</article>
	);
}

export default Order;