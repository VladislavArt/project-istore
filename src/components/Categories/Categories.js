import { useContext } from 'react';
import { AppContext } from '../../App'
import CatListItem from './CatListItem';
import './style.css'

function Categories () {

	const { filter, setFilter, cats, resetFilter } = useContext(AppContext)

	const clickHandler = (e)=> {
		const currentCat = cats.find((cat)=> {
			return cat.slug === e.target.dataset.cat
		})

		resetFilter()

		setFilter((prev)=> {
			return {
				...prev,
				category: currentCat
			}
		})
	}

	return (
		<div className="widget">
			<div className="widget__title">Категории</div>
			<div className="widget__body">
				<ul className="cat-list">
					{cats && cats.map((cat)=> {
						return (
							<CatListItem 
								key={cat.id} 
								cat={cat}
								activeCat={filter.category}
								clickHandler={clickHandler} 
							/>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

export default Categories ;