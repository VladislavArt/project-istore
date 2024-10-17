import Checkbox from '../Checkbox/Checkbox';

function FilterMemory({ filterValues, filter, setFilter }) {
	return (
		<div className="filter">
			<div className="filter__title">Объём памяти</div>
			<div className="filter__body filter__body--checkbox-list">
				{filterValues.memory.map((memory, index)=> {
					return (
						<Checkbox 
							key={index} 
							value={memory}
							filter={filter}
							setFilter={setFilter}
						/>
					)
				})}
			</div>
		</div>
	);
}

export default FilterMemory;