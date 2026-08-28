import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import { ROUTE_PATHS } from './routes/routePaths'
import MainLayout from './components/templates/mainLayout/MainLayout.jsx'
import HomePage from './components/pages/homePage/HomePage.jsx'
import ProductsPage from './components/pages/productsPage/ProductsPage.jsx'
import ComingSoonPage from './components/pages/comingSoonPage/ComingSoonPage.jsx'
import OurStoryPage from './components/pages/ourStoryPage/OurStoryPage.jsx'
import NotFoundPage from './components/pages/notFoundPage/NotFoundPage.jsx'
import Team from './components/pages/team/Team.jsx'
import Users from './components/users/Users.jsx'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path={ROUTE_PATHS.home} element={<HomePage />} />
					<Route path={ROUTE_PATHS.products} element={<ProductsPage />} />
					<Route path={ROUTE_PATHS.users} element={<Users />} />
					<Route path={ROUTE_PATHS.team} element={<Team />} />
					<Route path={ROUTE_PATHS.ourStory} element={<OurStoryPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
