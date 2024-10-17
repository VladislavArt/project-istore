import { useContext } from 'react'
import { priceFormatter } from '../../utils/priceFormatter'
import style from './CartItem.module.css'
import imgMinus from './minus.svg'
import imgPlus from './plus.svg'

import { CartContext } from '../../contexts/CartContext';

function CartItem( { item } ) {
	const { increaseCount, decreaseCount } = useContext(CartContext)

	return (
		<div className={style.item}>

			<div className={style.info}>
				<img
					className={style.img} 
					src={`./../img/${item.imgName}.jpg`}
					alt=''
				/>
				<div className={style.desc}>
					<h3 className={style.title}>{item.title}</h3>
					<p className={style.price}>{priceFormatter.format(item.price)}</p>
				</div>

			</div>
			<div className={style.controls}>
				<button className={style.btn} onClick={()=> decreaseCount(item.id)}>
					<img src={imgMinus} alt="" />
				</button>
				<input type="text" className={style.value} value={item.count} disabled />
				<button className={style.btn} onClick={()=> increaseCount(item.id)} >
					<img src={imgPlus} alt="" />
				</button>
			</div>

		</div>
	)
}

export default CartItem;