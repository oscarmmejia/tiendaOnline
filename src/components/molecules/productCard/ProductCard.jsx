import { useState } from 'react'
import CategoryTag from '../../atoms/categoryTag/CategoryTag'
import ProductImage from '../../atoms/productImage/ProductImage'
import ProductPrice from '../../atoms/productPrice/ProductPrice'
import ProductEditModal from '../productEditModal/ProductEditModal'
import './ProductCard.css'

const ProductCard = ({ product, onProductUpdated, onDelete }) => {
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
				<div className="productCardActions">
				<button
					className="productCardEditButton"
					onClick={handleOpenEditModal}
					aria-label={`Editar producto ${title}`}
					type="button"
				>
					Editar
				</button>
				<button
					className="productCardDeleteButton"
					onClick={() => onDelete(id)}
					aria-label={`Borrar producto ${title}`}
					type="button"
				>
					<svg viewBox="0 0 24 24">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" />
          </svg>
				</button>
				</div>
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
