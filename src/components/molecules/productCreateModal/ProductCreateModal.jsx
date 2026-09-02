import Modal from '../../modal/Modal'
import ProductCreateForm from '../productCreateForm/ProductCreateForm'

const ProductCreateModal = ({
  isOpen,
  categories,
  initialCategoryId,
  onClose,
  onProductCreated,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {isOpen && (
      <ProductCreateForm
        categories={categories}
        initialCategoryId={initialCategoryId}
        onCancel={onClose}
        onSuccess={onProductCreated}
      />
    )}
  </Modal>
)

export default ProductCreateModal
