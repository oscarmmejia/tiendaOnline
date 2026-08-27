import './styles/App.css'
import Hero from "./components/Hero/Hero";
import Footer from './components/footer/Footer.jsx'
import CategoryCard from './components/CategoryCard/CategoryCard.jsx'
import TitleDescriptionComponent from './components/TitleDescriptionComponent/TitleDescriptionComponent.jsx'
import Weather from './components/wather/weather.jsx'
import Users from "./components/users/Users";

function App() {
	return (
		<main>
			<Hero />
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

export default App;
