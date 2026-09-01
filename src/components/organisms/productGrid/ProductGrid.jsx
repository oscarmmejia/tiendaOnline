import ProductCard from '../../molecules/productCard/ProductCard'
import './ProductGrid.css'

const ProductGrid = ({ products, onProductUpdated }) => {
	if (products.length === 0) {
		return <p className="productGridEmpty">No hay productos en esta categoría.</p>
	}

	return (
		<ul className="productGrid">
			{products.map((product) => (
				<li key={product.id} className="productGridItem">
					<ProductCard product={product} onProductUpdated={onProductUpdated} />
				</li>
			))}
		</ul>
	)
}

export default ProductGrid
