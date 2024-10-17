import ColorCheckbox from '../ColorCheckbox/ColorCheckbox'

function FilterColor({ filterValues, filter, setFilter }) {



	return (
		<div className="filter">
			<div className="filter__title">Цвет</div>
			<div className="filter__body filter__body-colors-list">
				{filterValues.colors.map((color, index)=> {
					return (
						<ColorCheckbox
							key={index}
							value={color}
							filter={filter}
							setFilter={setFilter}
						/>
					)	
				})}
			</div>
		</div>
	);
}

export default FilterColor;