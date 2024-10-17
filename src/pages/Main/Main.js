import { useContext } from 'react'
import { AppContext } from '../../App'
import Card from '../../components/Card/Card'
import Error from '../../components/Error/Error'
import PriceReactSelect from '../../components/PriceReactSelect/PriceReactSelect'
import './style.css'

function Main() {
	const { products } = useContext(AppContext)

	if(!products) {
		return (
			<Error message='Нет продуктов для отображения' />
		)
	}

	return (
		<>
			{products.length ? (
				<div className='sort-wrapper'>
					<PriceReactSelect />
				</div>
			) : (
				<Error message='Нет продуктов для отображения. Поменяйте значение фильтра' />
			)}

			<div className='content__cards-grid'>
				{products.map((product, index) => {
					return <Card key={index} product={product} />
				})}
			</div>
		</>
	)
}

export default Main
