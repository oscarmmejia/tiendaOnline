import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim()

export const isWeatherApiConfigured = Boolean(apiKey)

const weatherApi = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5',
	params: {
		appid: apiKey,
		lang: 'es',
		units: 'metric',
	},
	timeout: 10000,
})

export const getCurrentWeather = async ({ latitude, longitude, signal }) => {
	const { data } = await weatherApi.get('/weather', {
		params: {
			lat: latitude,
			lon: longitude,
		},
		signal,
	})

	if (!data?.main || !data.weather?.[0]) {
		throw new Error('OpenWeather devolvió una respuesta inesperada')
	}

	return data
}

export const getWeatherErrorMessage = (error) => {
	if (!axios.isAxiosError(error)) {
		return 'No se pudo cargar el clima'
	}

	if (error.code === 'ERR_CANCELED') {
		return ''
	}

	if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
		return 'OpenWeather tardó demasiado'
	}

	switch (error.response?.status) {
		case 401:
			return 'Clave pendiente o no válida'
		case 429:
			return 'Límite del clima agotado'
		default:
			return 'No se pudo cargar el clima'
	}
}
