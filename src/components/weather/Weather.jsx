import { useEffect, useState } from 'react'
import './Weather.css'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function Weather() {
	const [weather, setWeather] = useState(null)
	const [error, setError] = useState('')
	const initialError = !API_KEY
		? 'Falta configurar la API'
		: !navigator.geolocation
			? 'GPS no disponible'
			: ''

	useEffect(() => {
		if (initialError) {
			return
		}

		navigator.geolocation.getCurrentPosition(
			async ({ coords }) => {
				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric&lang=es`,
					)

					if (!response.ok) {
						throw new Error('No se pudo consultar el clima')
					}

					setWeather(await response.json())
				} catch {
					setError('No se pudo cargar el clima')
				}
			},
			() => setError('Permite el acceso a tu ubicación'),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
		)
	}, [initialError])

	if (initialError || error) {
		return <aside className="weatherWidget weatherError">{initialError || error}</aside>
	}

	if (!weather) {
		return <aside className="weatherWidget weatherLoading">Localizando...</aside>
	}

	const weatherType = weather.weather[0]

	return (
		<aside className="weatherWidget" aria-label="Clima actual">
			<div className="weatherSummary">
				<img
					className="weatherIcon"
					src={`https://openweathermap.org/img/wn/${weatherType.icon}@2x.png`}
					alt={weatherType.description}
				/>
				<span className="weatherTemperature">{Math.round(weather.main.temp)}</span>
				<span className="weatherUnit">°C</span>
			</div>
		</aside>
	)
}

export default Weather
