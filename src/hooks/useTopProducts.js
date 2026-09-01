import { useEffect, useState } from 'react'
import { REQUEST_STATUS } from '../constants/requestStatus'
import { isRequestCanceled } from '../services/httpClient'
import { fetchTopProducts } from '../services/productsApi'

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
				if (!isRequestCanceled(error)) {
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
