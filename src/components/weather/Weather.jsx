import useWeather from '../../hooks/useWeather'
import './Weather.css'

const Weather = () => {
	const { weather, error } = useWeather()

	if (error) {
		return <aside className="weatherWidget weatherError">{error}</aside>
	}

	if (!weather) {
		return (
			<aside className="weatherWidget weatherLoading" role="status">
				Localizando...
			</aside>
		)
	}

	const { description, temperature, iconUrl } = weather
	const weatherLabel = `Clima actual: ${description}, ${temperature} grados`

	return (
		<aside className="weatherWidget" aria-label={weatherLabel} title={weatherLabel}>
			<div className="weatherSummary">
				<img className="weatherIcon" src={iconUrl} alt={description} />
				<span className="weatherTemperature">{temperature}</span>
				<span className="weatherUnit">°C</span>
			</div>
		</aside>
	)
}

export default Weather
