import { useEffect, useState } from 'react';
import './style.css'

function Checkbox({ value, filter, setFilter }) {

	const [status, setStatus] = useState(filter.memory.includes(value))

	useEffect(()=> {
		setFilter((prev)=> {
			const newMemory = [...prev.memory]
			if(status) {
				newMemory.push(value)
			} else {
				newMemory.splice(
					newMemory.findIndex((item)=> item === value)
				)
			}
			return {
				...prev,
				memory: [...newMemory]
			}
		})
	}, [status])

	useEffect(()=> {
		setStatus(filter.memory.includes(value))
	}, [filter])

	return (
		<label className="checkbox">
			<input 
				type="checkbox" 
				className="checkbox__item" 
				value={value} // 512 Gb
				checked={status}
				onChange={() => {
					setStatus((prev) => !prev)
				}}	
			/>
			<span className='checkbox__title'>{value}</span>				
		</label>
	);
}

export default Checkbox;