import { useEffect, useState } from 'react'
import { fetchCatalogCategories, fetchProducts } from '../services/productsApi'

export const CATALOG_STATUS = {
  loading: 'loading',
  ready: 'ready',
  error: 'error',
}

/**
 * Descarga productos y categorias en paralelo y expone el estado de la peticion
 * para que los componentes solo se ocupen de pintar.
 */
const useProductCatalog = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState(CATALOG_STATUS.loading)

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
        setStatus(CATALOG_STATUS.ready)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus(CATALOG_STATUS.error)
        }
      }
    }

    loadCatalog()

    return () => controller.abort()
  }, [])

  return { products, categories, status }
}

export default useProductCatalog
