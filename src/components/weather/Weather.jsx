import { useEffect, useState } from 'react'
import {
	getCurrentWeather,
	getWeatherErrorMessage,
	isWeatherApiConfigured,
} from '../../services/weatherApi'
import './Weather.css'

const geolocationOptions = {
	enableHighAccuracy: false,
	maximumAge: 300000,
	timeout: 10000,
}

const getGeolocationErrorMessage = (error) => {
	switch (error.code) {
		case 1:
			return 'Activa el permiso de ubicación'
		case 2:
			return 'Ubicación no disponible'
		case 3:
			return 'La ubicación tardó demasiado'
		default:
			return 'No se pudo obtener la ubicación'
	}
}

function Weather() {
	const [weather, setWeather] = useState(null)
	const [error, setError] = useState('')
	const configurationError = !isWeatherApiConfigured
		? 'Falta configurar OpenWeather'
		: !navigator.geolocation
			? 'GPS no disponible'
			: ''

	useEffect(() => {
		if (configurationError) {
			return
		}

		const controller = new AbortController()
		let cancelled = false

		navigator.geolocation.getCurrentPosition(
			async ({ coords }) => {
				if (cancelled) {
					return
				}

				try {
					const data = await getCurrentWeather({
						latitude: coords.latitude,
						longitude: coords.longitude,
						signal: controller.signal,
					})

					if (!cancelled) {
						setWeather(data)
					}
				} catch (requestError) {
					if (!cancelled) {
						setError(getWeatherErrorMessage(requestError))
					}
				}
			},
			(geolocationError) => {
				if (!cancelled) {
					setError(getGeolocationErrorMessage(geolocationError))
				}
			},
			geolocationOptions,
		)

		return () => {
			cancelled = true
			controller.abort()
		}
	}, [configurationError])

	if (configurationError || error) {
		return (
			<aside className="weatherWidget weatherError" role="status">
				{configurationError || error}
			</aside>
		)
	}

	if (!weather) {
		return (
			<aside className="weatherWidget weatherLoading" role="status">
				Localizando...
			</aside>
		)
	}

	const weatherType = weather.weather[0]
	const weatherLabel = `${weather.name}: ${weatherType.description}, ${Math.round(weather.main.temp)} grados`

	return (
		<aside className="weatherWidget" aria-label={weatherLabel} title={weatherLabel}>
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
