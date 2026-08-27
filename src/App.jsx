import './styles/App.css'
import Footer from './components/footer/Footer.jsx'
import Weather from './components/wather/weather.jsx'
import Users from "./components/users/Users";

function App() {
	return (
		<main>
			<Weather />
			<Users />
			<Footer />
		</main>
	)
}

export default App;