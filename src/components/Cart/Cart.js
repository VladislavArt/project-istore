import style from './style.module.css'
import close from './close.svg'
import CartItem from '../CartItem/CartItem';
import { useContext } from 'react';
import { priceFormatter } from '../../utils/priceFormatter';
import { Link } from 'react-router-dom';
import btn from './../Button/style.module.css'

import { CartContext } from '../../contexts/CartContext';

function Cart() {
	const { 
		items, 
		setCartOpen, 
		totalCount, 
		totalAmount 
	} = useContext(CartContext)

	const cartItemsHTML = ()=> {
		if(items && !items.length) {
			return (
				<section className={style.items}>
					<p>Корзина пуста.</p>
				</section>
			)
		}

		if(items && items.length) {
			return (
				<>
					<section className={style.items}>
						{items.map((item, index)=> {
							return <CartItem key={index}item={item}/>
						})}
					</section>
					
					<section className={style.info}>
						<p>Итого: {totalCount}</p>
						<p>Стоимость: {priceFormatter.format(totalAmount)}</p>
					</section>

					<Link to="order" className={btn.btn} onClick={()=> setCartOpen(false)}>
						Оформить заказ
					</Link>	
				</>
			)
		}
	}

	return (
		<section className={style.cart}>

			<header className={style.header}>
				<h2 className={style.title}>Корзина</h2>
				<button 
					onClick={() => setCartOpen((prev)=> !prev)} 
					className={style.closeBtn}
				>
					<img src={close} alt="" />
				</button>
			</header>

			<div className={style.body}>
				{cartItemsHTML()}
			</div>

		</section>
	)
}

export default Cart;

