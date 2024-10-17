import style from './style.module.css'

function OrderSuccess() {
	return (
		<article>
			<div className="container">
				<div className={style.info}>
					<h1>Заказ создан успешно!</h1>
				</div>
			</div>
		</article>
	);
}

export default OrderSuccess;