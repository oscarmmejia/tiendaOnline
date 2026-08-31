import Modal from '../../modal/Modal'
import ProductEditForm from '../productEditForm/ProductEditForm'

const ProductEditModal = ({ isOpen, onClose, productId, onSuccess }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{isOpen && productId && (
				<ProductEditForm productId={productId} onClose={onClose} onSuccess={onSuccess} />
			)}
		</Modal>
	)
}

export default ProductEditModal
