import Input from '../Input/Input';
import { useState, useEffect } from 'react';

import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import CurrencyInput from 'react-currency-input-field'


function FilterPrice ({ filter, setFilter }) {

	const [rangeSliderValue, setRangeSliderValue] = useState([
		filter.price.min, 
		filter.price.max
	])

	useEffect (() => {
		setRangeSliderValue([filter.price.min, filter.price.max])
	}, [filter])

	const inputHandler = (e)=> {
		setRangeSliderValue(e)

		setFilter((prev)=> {
			return {
				...prev,
				price: {
					min: e[0],
					max: e[1]
				}
			}
		})
	}

	return (
		<div className="filter">
			<div className="filter__title">Цена</div>

			<div className="filter__body filter__body--price">
				<CurrencyInput
					id="priceMin"
					className="input"
					value={filter.price.min}
					name="priceMin"
					placeholder='Please enter a number'
					defaultValue={filter.price.min}
					decimalsLimit={0}
					suffix='₽'
					onValueChange={(value) => {
						setFilter((prev) => {
							return {
								...prev,
								price: {
									...prev.price,
									min: value
								}
							}
						})
					}}
				/>
				<span>-</span>
				<CurrencyInput
					id="priceMax"
					className="input"
					value={filter.price.max}
					name="priceMax"
					placeholder='Please enter a number'
					defaultValue={filter.price.max}
					decimalsLimit={0}
					suffix='₽'
					onValueChange={(value) => {
						setFilter((prev) => {
							return {
								...prev,
								price: {
									...prev.price,
									max: value
								}
							}
						})
					}}
				/>
			</div>

			<div className='filter__body--range'>
				<RangeSlider 
					value={rangeSliderValue} 
					onInput={(e)=>{inputHandler(e)}} 
					min={0} 
					max={200000} 
				/>
			</div>
		</div>
	);
}

export default FilterPrice ;