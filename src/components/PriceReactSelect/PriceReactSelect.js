import { useContext } from 'react';
import { AppContext } from '../../App';
import Select from 'react-select'

function PriceReactSelect() {

	const { filter, setFilter } = useContext(AppContext)

	const options = [
		{ value: 'priceAsc', label: 'От дешевых к дорогим' },
		{ value: 'priceDesc', label: 'От дорогих к дешевым' }
	]

	const defaultValueIndex = options.findIndex((item)=> {
		return filter.sort === item.value
	})

	return (
		<Select 
			className='priceReactSelect'
			isClearable
			options={options}
			placeholder='Сортировать по цене'
			defaultValue={options[defaultValueIndex]}
			onChange={(option)=> { 
				setFilter((prev)=> {
					return {
						...prev,
						sort: option ? option.value : ''
					}
				})
			}}
		/>
	);
}

export default PriceReactSelect;