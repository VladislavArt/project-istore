import { Outlet } from 'react-router-dom'
import Error from './../components/Error/Error'
import SpinnerLoader from './../components/SpinnerLoader/SpinnerLoader'
import Categories from '../components/Categories/Categories'
import Filter from '../components/Filter/Filter'
import './style.css'

function Layout() {
	return (
		<main className='main container'>
			<aside className='sidebar'>
				<Categories />
				<Filter />
			</aside>

			<div className='content'>
				<Outlet />
			</div>
		</main>
	)
}

function MainLayout({ pageLoading, pageError }) {
	return pageLoading ? (
		<SpinnerLoader />
	) : pageError ? (
		<Error message='Ошибка загрузки страницы' />
	) : (
		<Layout />
	)
}

export default MainLayout
