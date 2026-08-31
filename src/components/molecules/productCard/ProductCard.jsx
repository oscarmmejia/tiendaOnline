import { useState } from 'react'
import CategoryTag from '../../atoms/categoryTag/CategoryTag'
import ProductImage from '../../atoms/productImage/ProductImage'
import ProductPrice from '../../atoms/productPrice/ProductPrice'
import ProductEditModal from '../productEditModal/ProductEditModal'
import './ProductCard.css'

const ProductCard = ({ product, onProductUpdated }) => {
	const { id, title, description, price, imageUrl, categoryName } = product
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const handleOpenEditModal = () => {
		setIsEditModalOpen(true)
	}

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false)
	}

	const handleSuccess = () => {
		if (onProductUpdated) onProductUpdated()
		setIsEditModalOpen(false)
	}

	return (
		<>
			<article className="productCard">
				<div className="productCardMedia">
					<ProductImage src={imageUrl} alt={title} />
					<div className="productCardTag">
						<CategoryTag label={categoryName} />
					</div>
				</div>
				<h2 className="productCardTitle">{title}</h2>
				<p className="productCardDescription">{description}</p>
				<ProductPrice amount={price} />
				<button
					className="productCardEditButton"
					onClick={handleOpenEditModal}
					aria-label={`Editar producto ${title}`}
					type="button"
				>
					Editar
				</button>
			</article>

			<ProductEditModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				productId={id}
				onSuccess={handleSuccess}
			/>
		</>
	)
}

export default ProductCard
