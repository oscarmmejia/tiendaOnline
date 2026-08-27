import { useMemo, useState } from 'react'
import useProductCatalog, { CATALOG_STATUS } from '../../../hooks/useProductCatalog'
import { ALL_CATEGORIES } from '../../../services/productsApi'
import PageHeading from '../../molecules/pageHeading/PageHeading'
import CategoryFilter from '../../molecules/categoryFilter/CategoryFilter'
import ProductGrid from '../../organisms/productGrid/ProductGrid'
import './ProductsPage.css'

const PAGE_TITLE = 'Nuestros productos'
const PAGE_DESCRIPTION =
	'Catálogo de tecnología, indumentaria, calzado, muebles y más. Disponibles para adquisición inmediata en el nexus de OKYDOKY.'

const ProductsPage = () => {
	const { products, categories, status } = useProductCatalog()
	const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

	const visibleProducts = useMemo(() => {
		if (selectedCategory === ALL_CATEGORIES) {
			return products
		}

		return products.filter((product) => product.categorySlug === selectedCategory)
	}, [products, selectedCategory])

	return (
		<section className="productsPage">
			<PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

			<CategoryFilter
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
			/>

			{status === CATALOG_STATUS.loading && (
				<p className="productsPageStatus">Cargando catálogo...</p>
			)}

			{status === CATALOG_STATUS.error && (
				<p className="productsPageStatus productsPageStatusError">
					No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.
				</p>
			)}

			{status === CATALOG_STATUS.ready && <ProductGrid products={visibleProducts} />}
		</section>
	)
}

export default ProductsPage
