import './ProductPrice.css'

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

const ProductPrice = ({ amount }) => {
	return <p className="productPrice">{priceFormatter.format(amount)}</p>
}

export default ProductPrice
