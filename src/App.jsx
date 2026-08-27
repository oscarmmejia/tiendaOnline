import './styles/App.css'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Weather from './components/wather/weather.jsx'
import TitleDescriptionComponent from './components/TitleDescriptionComponent/TitleDescriptionComponent.jsx'
import CategoryCard from './components/CategoryCard/CategoryCard.jsx'
import ProductsPage from './components/pages/ProductsPage/ProductsPage.jsx'
import Users from './components/users/Users.jsx'
import Footer from './components/footer/Footer.jsx'

const App = () => {
	return (
		<main>
			<Header />
			<Hero />
			<Weather />
			<TitleDescriptionComponent
				subtitle='QUANTUM DEPARTMENT'
				subtitleColor='cyan'
				title='Categorías de Productos'
				description='Ponemos a tu disposición una oferta diversificada de productos'
			/>
			<CategoryCard />
			<ProductsPage />
			<Users />
			<Footer />
		</main>
	)
}

export default App
