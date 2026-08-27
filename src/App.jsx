import './styles/App.css'
import Hero from "./components/Hero/Hero";
import Footer from './components/footer/Footer.jsx'
import Weather from './components/wather/weather.jsx'
import Users from "./components/users/Users";

function App() {
	return (
		<main>
			<Hero />
			<Weather />
			<Users />
			<Footer />
		</main>
	)
}

export default App;
