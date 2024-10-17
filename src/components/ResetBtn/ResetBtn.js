function ResetBtn( { setFilter, filterValues }) {

	function clickHandler () {
		setFilter((prev)=> {
			return {
				...prev,
				price: {
          min: filterValues.price.min,
          max: filterValues.price.max
        },
				memory: [],
    		color: []
			}
		})
	}

	return <button onClick={() => clickHandler()}>Сбросить</button>
}

export default ResetBtn;