import btn from './style.module.css'

function Button( {clickHandler, title, disabled = false} ) {
	return (
		<button 
			onClick={clickHandler} 
			className={btn.btn}
			disabled={disabled}
		>
			{title}
		</button>
	);
}

export default Button;