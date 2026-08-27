import ProductCard from '../../molecules/ProductCard/ProductCard'
import './ProductGrid.css'

const ProductGrid = ({ products }) => {
	if (products.length === 0) {
		return <p className="productGridEmpty">No hay productos en esta categoría.</p>
	}

	return (
		<ul className="productGrid">
			{products.map((product) => (
				<li key={product.id} className="productGridItem">
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	)
}

export default ProductGrid
