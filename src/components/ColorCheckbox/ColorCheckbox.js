import { useEffect, useState } from 'react';
import './style.css'

function ColorCheckbox({ value, filter, setFilter }) {

	const [status, setStatus] = useState(filter.color.includes(value))

	useEffect(()=> {
		setStatus(filter.color.includes(value))
	}, [filter])

	useEffect(()=> {
		setFilter((prev)=> {
			const newColors = [...prev.color]
			if(status) {
				newColors.push(value)
			} else {
				newColors.splice(
					newColors.findIndex((item)=> item === value)
				)
			}
			return {
				...prev,
				color: [...newColors]
			}
		})
	}, [status])

	return (
		<label className="color-checkbox">
			<input 
				type="checkbox" 
				className="color-checkbox__real visually-hidden"
				value={value}
				checked={status}
				onChange={() => {setStatus((prev) => !prev)}}	
			/>
			<span className={`color-checkbox__visible ${value}`}>
			</span>				
		</label>
	);
}

export default ColorCheckbox;