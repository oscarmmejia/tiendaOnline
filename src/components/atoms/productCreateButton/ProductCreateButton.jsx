import './ProductCreateButton.css'

const ProductCreateButton = ({ onClick, disabled = false }) => (
  <button
    type="button"
    className="productCreateButton"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="productCreateButtonIcon" aria-hidden="true">+</span>
    Añadir producto
  </button>
)

export default ProductCreateButton
