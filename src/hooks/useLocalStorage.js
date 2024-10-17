import { useState } from "react";

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(()=> {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch(error) {
			console.log('Ошибка чтения из localStorage', error)
			return initialValue
		}
	})

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value() : value
			setStoredValue(valueToStore)
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch(error){
			console.log('Ошибка при сохранении в localStorage', error)
		}
	}

	return [storedValue, setValue]
}

export default useLocalStorage;