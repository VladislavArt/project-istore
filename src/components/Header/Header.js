import { Link } from 'react-router-dom'
import { useContext } from 'react';
import cartImg from './cart.svg'
import './style.css'

import { CartContext } from '../../contexts/CartContext';

function Header ({ resetFilter }) {
	const { setCartOpen, totalCount } = useContext(CartContext)

	return (
		<header className="header">
			<div className="container header-container">
				<Link to="/" className="logo" onClick={resetFilter}>
					istore
				</Link>
				<button onClick={() => setCartOpen((prev)=> !prev)} className="cart">
					<img src={cartImg} alt="Корзина" />
					{totalCount > 0 ? <div className="cart__count">{totalCount}</div> : null}
					Корзина
				</button>
			</div>
		</header>
	)
}

export default Header