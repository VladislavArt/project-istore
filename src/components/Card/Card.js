import { Link } from 'react-router-dom';
import './style.css'
import { priceFormatter } from '../../utils/priceFormatter';
import Button from '../Button/Button';

import { CartContext } from '../../contexts/CartContext';
import { useContext } from 'react';

function Card( {product} ) {

	const {addToCart} = useContext(CartContext)

	return (
		<div className="card">
			<img 
				className="card__img" 
				src={`./img/${product.imgName}.jpg`}
				alt={product.title}
			/>
			<Link to={`product/${product.id}`} className='card__link'>
				<h3 className="card__title">{product.title}</h3>
			</Link>
			<p className="card__price">{priceFormatter.format(product.price)}</p>
			<Button 
				title='В корзину' 
				clickHandler={()=> {
					addToCart(product)
				}} 
			/>
		</div>
	);

}

export default Card;