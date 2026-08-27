import CategoryTag from '../../atoms/categoryTag/CategoryTag'
import ProductImage from '../../atoms/productImage/ProductImage'
import ProductPrice from '../../atoms/productPrice/ProductPrice'
import './ProductCard.css'

const ProductCard = ({ product }) => {
	const { title, description, price, imageUrl, categoryName } = product

	return (
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
		</article>
	)
}

export default ProductCard
