import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import useProductCatalog from '../../../hooks/useProductCatalog'
import { REQUEST_STATUS } from '../../../constants/requestStatus'
import { ALL_CATEGORIES } from '../../../services/productsApi'
import PageHeading from '../../molecules/pageHeading/PageHeading'
import CategoryFilter from '../../molecules/categoryFilter/CategoryFilter'
import ProductGrid from '../../organisms/productGrid/ProductGrid'
import './ProductsPage.css'

const PAGE_TITLE = 'Nuestros productos'
const PAGE_DESCRIPTION =
	'Catálogo de tecnología, indumentaria, calzado, muebles y más. Disponibles para adquisición inmediata en el nexus de OKYDOKY.'

const getCategoryFromSearchParams = (searchParams) => {
	const categoryId = searchParams.get('categoryId')

	return categoryId && /^[1-5]$/.test(categoryId) ? categoryId : ALL_CATEGORIES
}

const ProductsPage = () => {
	const { products, categories, status } = useProductCatalog()
	const [searchParams, setSearchParams] = useSearchParams()
	const selectedCategory = getCategoryFromSearchParams(searchParams)

	const handleCategoryChange = (categoryId) => {
		setSearchParams(categoryId === ALL_CATEGORIES ? {} : { categoryId })
	}

	const visibleProducts = useMemo(() => {
		if (selectedCategory === ALL_CATEGORIES) {
			return products
		}

		return products.filter(
			(product) => String(product.categoryId) === selectedCategory,
		)
	}, [products, selectedCategory])

	return (
		<section className="productsPage">
			<PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

			<CategoryFilter
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={handleCategoryChange}
			/>

			{status === REQUEST_STATUS.loading && (
				<p className="productsPageStatus">Cargando catálogo...</p>
			)}

			{status === REQUEST_STATUS.error && (
				<p className="productsPageStatus productsPageStatusError">
					No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.
				</p>
			)}

			{status === REQUEST_STATUS.ready && <ProductGrid products={visibleProducts} />}
		</section>
	)
}

export default ProductsPage
