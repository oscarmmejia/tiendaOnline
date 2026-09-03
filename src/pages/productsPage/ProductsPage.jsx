import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useProductCatalog from '../../hooks/useProductCatalog'
import { REQUEST_STATUS } from '../../constants/requestStatus'
import { ALL_CATEGORIES, deleteProduct } from '../../services/productsApi'
import ProductCreateButton from '../../components/atoms/productCreateButton/ProductCreateButton'
import PageHeading from '../../components/molecules/pageHeading/PageHeading'
import CategoryFilter from '../../components/molecules/categoryFilter/CategoryFilter'
import ProductCreateModal from '../../components/molecules/productCreateModal/ProductCreateModal'
import ProductGrid from '../../components/organisms/productGrid/ProductGrid'
import './ProductsPage.css'

const PAGE_TITLE = 'Nuestros productos'
const PAGE_DESCRIPTION =
	'Catálogo de tecnología, indumentaria, calzado, muebles y más. Disponibles para adquisición inmediata en el nexus de OKYDOKY.'

const VALID_CATEGORY_PATTERN = /^[1-5]$/

const getCategoryFromSearchParams = (searchParams) => {
	const categoryId = searchParams.get('categoryId')

	return categoryId && VALID_CATEGORY_PATTERN.test(categoryId) ? categoryId : ALL_CATEGORIES
}

const ProductsPage = () => {
	const { products, categories, status, refresh, addProduct } = useProductCatalog()
	const [searchParams, setSearchParams] = useSearchParams()
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const selectedCategory = getCategoryFromSearchParams(searchParams)
	const initialCreateCategoryId = selectedCategory === ALL_CATEGORIES
		? categories[0]?.id
		: Number(selectedCategory)

	const handleCategoryChange = (categoryId) => {
		setSearchParams(categoryId === ALL_CATEGORIES ? {} : { categoryId })
	}

	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true)
	}

	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false)
	}

	const handleProductCreated = (createdProduct) => {
		addProduct(createdProduct)

		const isFilteredCategory = selectedCategory !== ALL_CATEGORIES
		const isDifferentCategory = selectedCategory !== String(createdProduct.categoryId)

		if (isFilteredCategory && isDifferentCategory) {
			setSearchParams({ categoryId: String(createdProduct.categoryId) })
		}

		handleCloseCreateModal()
	}

	const handleDelete = async (id) => {
		await deleteProduct(id)
		refresh()
	}

	const visibleProducts = useMemo(() => {
		if (selectedCategory === ALL_CATEGORIES) {
			return products
		}

		return products.filter((product) => String(product.categoryId) === selectedCategory)
	}, [products, selectedCategory])

	return (
		<section className="productsPage">
			<PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />

			<div className="productsPageToolbar">
				<CategoryFilter
					categories={categories}
					selectedCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
				/>
				<ProductCreateButton
					onClick={handleOpenCreateModal}
					disabled={status !== REQUEST_STATUS.ready || categories.length === 0}
				/>
			</div>

			{status === REQUEST_STATUS.loading && (
				<p className="productsPageStatus">Cargando catálogo...</p>
			)}

			{status === REQUEST_STATUS.error && (
				<p className="productsPageStatus productsPageStatusError">
					No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.
				</p>
			)}

			{status === REQUEST_STATUS.ready && <ProductGrid products={visibleProducts} onProductUpdated={refresh} onDelete={handleDelete} />}

			<ProductCreateModal
				isOpen={isCreateModalOpen}
				categories={categories}
				initialCategoryId={initialCreateCategoryId}
				onClose={handleCloseCreateModal}
				onProductCreated={handleProductCreated}
			/>
		</section>
	)
}

export default ProductsPage
