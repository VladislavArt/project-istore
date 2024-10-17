import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App'
import './style.css'
import FilterPrice from '../FilterPrice/FilterPrice';
import FilterMemory from '../FilterMemory/FilterMemory';
import FilterColor from '../FilterColor/FilterColor';
import ResetBtn from '../ResetBtn/ResetBtn';


function Filter() {
	const { filterValues, filter, setFilter } = useContext(AppContext)

	const [showResetBtn, setShowResetBtn] = useState(false)

	useEffect(() =>{
		if (
			(filter.price.min && filter.price.min !== filterValues.price.min) ||
			(filter.price.max && filter.price.max !== filterValues.price.max) ||
			filter.memory.length ||
			filter.color.length
		) {
			setShowResetBtn(true)
		}
	}, [filter])

	
	
	return (
		<>
			<div className="widget">
				<div className="widget__title">Фильтр</div>
				<div className="widget__body widget__body--filters-list">
					{filter.price.max && <FilterPrice filter={filter} setFilter={setFilter} />}
					{filterValues && <FilterMemory filterValues={filterValues} filter={filter} setFilter={setFilter} />}
					{filterValues && <FilterColor filterValues={filterValues} filter={filter} setFilter={setFilter} />}
					{showResetBtn && <ResetBtn setFilter={setFilter} filterValues={filterValues} />}
				</div>
			</div>
		</>
	);
}

export default Filter;