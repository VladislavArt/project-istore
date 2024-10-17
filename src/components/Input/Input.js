import './style.css'

function Input({ value, setFilter, type }) {
	return (
		<input 
			type="text" 
			className="input" 
			value={value}
			onChange={(e) => { setFilter((prev) => {
				return {
					...prev,
					price: {
						...prev.price,
						[type]: e.target.value
					}
				}
				})
			}}
		/>
	);

}

export default Input;