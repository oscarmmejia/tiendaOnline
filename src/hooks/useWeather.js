import { useEffect, useState } from 'react'
import { isRequestCanceled } from '../services/httpClient'
import { fetchWeatherByCoords, WEATHER_API_KEY } from '../services/weatherService'

const GEOLOCATION_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 300000,
}

const ERROR_MESSAGES = {
	missingApiKey: 'Falta configurar la API',
	noGeolocation: 'GPS no disponible',
	deniedLocation: 'Permite el acceso a tu ubicación',
	requestFailed: 'No se pudo cargar el clima',
}

/** Lo que impide consultar el clima antes siquiera de pedirlo. */
const getSetupError = () => {
	if (!WEATHER_API_KEY) {
		return ERROR_MESSAGES.missingApiKey
	}

	if (!navigator.geolocation) {
		return ERROR_MESSAGES.noGeolocation
	}

	return ''
}

/**
 * Localiza al usuario y consulta el clima de sus coordenadas.
 */
const useWeather = () => {
	const [weather, setWeather] = useState(null)
	const [requestError, setRequestError] = useState('')
	const setupError = getSetupError()

	useEffect(() => {
		if (setupError) {
			return
		}

		const controller = new AbortController()

		navigator.geolocation.getCurrentPosition(
			async ({ coords }) => {
				try {
					setWeather(await fetchWeatherByCoords(coords, controller.signal))
				} catch (error) {
					if (!isRequestCanceled(error)) {
						setRequestError(ERROR_MESSAGES.requestFailed)
					}
				}
			},
			() => {
				// La geolocalizacion tambien responde tarde: si ya no estamos, se ignora.
				if (!controller.signal.aborted) {
					setRequestError(ERROR_MESSAGES.deniedLocation)
				}
			},
			GEOLOCATION_OPTIONS,
		)

		return () => controller.abort()
	}, [setupError])

	return { weather, error: setupError || requestError }
}

export default useWeather
