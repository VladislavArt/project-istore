const priceFormatter = new Intl.NumberFormat('ru-RU', { 
	style: 'currency', 
	currency: 'RUB',
	maximumFractionDigits: 0
})

export { priceFormatter }