import { httpClient } from './httpClient'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const ICON_BASE_URL = 'https://openweathermap.org/img/wn'

export const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

/** La API devuelve mucho mas de lo que pinta el widget: se queda lo justo. */
const normalizeWeather = ({ weather, main }) => {
	const [condition] = weather

	return {
		temperature: Math.round(main.temp),
		description: condition.description,
		iconUrl: `${ICON_BASE_URL}/${condition.icon}@2x.png`,
	}
}

/**
 * @param {GeolocationCoordinates} coords
 * @param {AbortSignal} [signal]
 */
export const fetchWeatherByCoords = async ({ latitude, longitude }, signal) => {
	const { data } = await httpClient.get(API_URL, {
		params: {
			lat: latitude,
			lon: longitude,
			appid: WEATHER_API_KEY,
			units: 'metric',
			lang: 'es',
		},
		signal,
	})

	return normalizeWeather(data)
}
