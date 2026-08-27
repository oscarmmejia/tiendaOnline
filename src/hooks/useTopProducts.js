import { useEffect, useState } from 'react'
import { REQUEST_STATUS } from '../constants/requestStatus'
import { fetchTopProducts } from '../services/productsApi'

/**
 * Descarga los productos mas caros del catalogo.
 *
 * @param {number} limit cuantos productos devolver
 */
const useTopProducts = (limit) => {
	const [products, setProducts] = useState([])
	const [status, setStatus] = useState(REQUEST_STATUS.loading)

	useEffect(() => {
		const controller = new AbortController()

		const loadTopProducts = async () => {
			try {
				setProducts(await fetchTopProducts(limit, controller.signal))
				setStatus(REQUEST_STATUS.ready)
			} catch (error) {
				if (error.name !== 'AbortError') {
					setStatus(REQUEST_STATUS.error)
				}
			}
		}

		loadTopProducts()

		return () => controller.abort()
	}, [limit])

	return { products, status }
}

export default useTopProducts
