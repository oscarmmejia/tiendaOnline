import { useCallback, useEffect, useState } from 'react'
import { REQUEST_STATUS } from '../constants/requestStatus'
import { isRequestCanceled } from '../services/httpClient'
import { fetchCatalogCategories, fetchProducts } from '../services/productsApi'

const useProductCatalog = () => {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [status, setStatus] = useState(REQUEST_STATUS.loading)
	const [reloadKey, setReloadKey] = useState(0)

	const refresh = useCallback(() => {
		setReloadKey((prev) => prev + 1)
	}, [])

	const addProduct = useCallback((product) => {
		setProducts((currentProducts) => [
			product,
			...currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
		])
	}, [])

	useEffect(() => {
		const controller = new AbortController()

		const loadCatalog = async () => {
			try {
				setStatus(REQUEST_STATUS.loading)
				const [catalogProducts, catalogCategories] = await Promise.all([
					fetchProducts(controller.signal),
					fetchCatalogCategories(controller.signal),
				])

				setProducts(catalogProducts)
				setCategories(catalogCategories)
				setStatus(REQUEST_STATUS.ready)
			} catch (error) {
				if (!isRequestCanceled(error)) {
					setStatus(REQUEST_STATUS.error)
				}
			}
		}

		loadCatalog()

		return () => controller.abort()
	}, [reloadKey])

	return { products, categories, status, refresh, addProduct }
}

export default useProductCatalog
