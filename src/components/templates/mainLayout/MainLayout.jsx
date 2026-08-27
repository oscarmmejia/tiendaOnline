import { Outlet } from 'react-router-dom'
import useScrollToTop from '../../../hooks/useScrollToTop'
import Header from '../../header/Header.jsx'
import Footer from '../../footer/Footer.jsx'

/**
 * Estructura comun a todas las paginas: solo cambia lo que hay dentro de main.
 */
const MainLayout = () => {
	useScrollToTop()

	return (
		<>
			<Header />
			<main className="app">
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default MainLayout
