import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import './style.css'
import Button from "../../components/Button/Button";
import { priceFormatter } from "../../utils/priceFormatter";

import { CartContext } from "../../contexts/CartContext";

function Product() {
	const { addToCart, setCartOpen } = useContext(CartContext)

	const { productId } = useParams()
	const [product, setProduct] = useState(null)

	useEffect(()=> {
		fetchProduct(productId).then((data)=> {
			setProduct(data)
		})
	}, [])

	return (
		<>
			{product && (
				<article className="product">
					<div className="product__img-wrapper">
						<img
							className="product__img" 
							src={`./../img/${product.imgName}.jpg`}
							alt={product.title}
						/>
					</div>

					<div className="product__desc">
						<h1 className="product__title">{product.title}</h1>
						<p className="product__price">
							<span>{priceFormatter.format(product.price)}</span>
						</p>
						<p className="product__text">{product.desc}</p>
						<Button clickHandler={()=> {
							setCartOpen(true)
							addToCart(product)
							}} 
							title='В корзину' 
						/>
					</div>
				</article>
			)}
		</>
	)
}

export default Product;