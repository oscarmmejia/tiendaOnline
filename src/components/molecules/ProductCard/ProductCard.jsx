import CategoryTag from '../../atoms/CategoryTag/CategoryTag'
import ProductImage from '../../atoms/ProductImage/ProductImage'
import ProductPrice from '../../atoms/ProductPrice/ProductPrice'
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
