import { Link } from "react-router-dom";

function CatListItem( {cat, clickHandler, activeCat} ) {

	let activeClass

	if(activeCat) {
		activeClass = activeCat.id === cat.id ? 'active' : ''
	}

	return (
		<li className={activeClass}>
			<Link to="/" data-cat={cat.slug} onClick={clickHandler} >
				{cat.title}
			</Link>
		</li>
	)
}

export default CatListItem;