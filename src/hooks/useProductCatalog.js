import { useEffect, useState } from 'react'
import { REQUEST_STATUS } from '../constants/requestStatus'
import { fetchCatalogCategories, fetchProducts } from '../services/productsApi'

const useProductCatalog = () => {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [status, setStatus] = useState(REQUEST_STATUS.loading)

	useEffect(() => {
		const controller = new AbortController()

		const loadCatalog = async () => {
			try {
				const [catalogProducts, catalogCategories] = await Promise.all([
					fetchProducts(controller.signal),
					fetchCatalogCategories(controller.signal),
				])

				setProducts(catalogProducts)
				setCategories(catalogCategories)
				setStatus(REQUEST_STATUS.ready)
			} catch (error) {
				if (error.name !== 'AbortError') {
					setStatus(REQUEST_STATUS.error)
				}
			}
		}

		loadCatalog()

		return () => controller.abort()
	}, [])

	return { products, categories, status }
}

export default useProductCatalog
