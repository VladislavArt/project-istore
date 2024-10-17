import Card from '../../components/Card/Card'
import Categories from '../../components/Categories/Categories'
import Error from '../../components/Error/Error'
import Filter from '../../components/Filter/Filter'
import PriceReactSelect from '../../components/PriceReactSelect/PriceReactSelect'
import './style.css'

const contentEmpty = ()

const contentProducts = ()

function Main({ products, cats }) {
	return (
		<main className="main container">

			{products.length ? 
				<aside className="sidebar">
					<Categories cats={cats} />
					<Filter />
				</aside> : ''
			}
	
			<div className={products.length ? 'content' : 'content content--empty'}>

				{products.length ? <div className='sort-wrapper'>
					<PriceReactSelect />
				</div> : ''}

				<div className='content__cards-grid'>

					{!products.length ? <Error message='Ошибка получения продуктов' /> : ''}

					{products.length ? products.map((product, index) => (
						<Card key={index} product={product} />
					)) : ''}

				</div>

			</div>

		</main>
	)
}

export default Main