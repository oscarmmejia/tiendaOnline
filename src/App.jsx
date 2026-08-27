import './styles/App.css'
import Footer from './components/footer/Footer.jsx'
import CategoryCard from './components/CategoryCard/CategoryCard.jsx'
import TitleDescriptionComponent from './components/TitleDescriptionComponent/TitleDescriptionComponent.jsx'
import Weather from './components/wather/weather.jsx'

function App() {
	return (
		<main>
			<Weather />
			<TitleDescriptionComponent
				subtitle='QUANTUM DEPARTMENT'
				subtitleColor='cyan'
				title='Categorías de Productos'
				description='Ponemos a tu disposición una oferta diversificada de productos'
			/>
			<CategoryCard />
			<Footer />
		</main>
	)
}

export default App
