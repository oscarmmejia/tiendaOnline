import useWeather from '../../hooks/useWeather'
import './Weather.css'

const Weather = () => {
	const { weather, error } = useWeather()

	if (error) {
		return <aside className="weatherWidget weatherError">{error}</aside>
	}

	if (!weather) {
		return <aside className="weatherWidget weatherLoading">Localizando...</aside>
	}

	return (
		<aside className="weatherWidget" aria-label="Clima actual">
			<div className="weatherSummary">
				<img className="weatherIcon" src={weather.iconUrl} alt={weather.description} />
				<span className="weatherTemperature">{weather.temperature}</span>
				<span className="weatherUnit">°C</span>
			</div>
		</aside>
	)
}

export default Weather
