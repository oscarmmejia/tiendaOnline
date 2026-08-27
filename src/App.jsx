import { useState } from 'react'
import './styles/App.css'
import Footer from './components/footer/Footer.jsx'
import Team from './components/pages/team.jsx'
import Weather from './components/wather/weather.jsx'

function App() {
	const [showTeam, setShowTeam] = useState(false)

	return (
		<>
			<button className="team-toggle" type="button" onClick={() => setShowTeam(!showTeam)}>
				{showTeam ? 'Ver clima' : 'Ver equipo'}
			</button>
			{showTeam ? <Team /> : (
				<main>
					<Weather />
					<Footer />
				</main>
			)}
		</>
	)
}

export default App
