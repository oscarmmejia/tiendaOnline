import { REQUEST_STATUS } from '../../../constants/requestStatus'
import useTopProducts from '../../../hooks/useTopProducts'
import ProductCard from '../../molecules/productCard/ProductCard'
import './TopProductsBanner.css'

const TOP_PRODUCTS_LIMIT = 5

const TopProductsBanner = () => {
	const { products, status } = useTopProducts(TOP_PRODUCTS_LIMIT)

	if (status === REQUEST_STATUS.loading) {
		return <p className="topProductsBannerStatus">Cargando destacados...</p>
	}

	if (status === REQUEST_STATUS.error) {
		return (
			<p className="topProductsBannerStatus topProductsBannerStatusError">
				No se pudieron cargar los destacados.
			</p>
		)
	}

	return (
		<ul className="topProductsBanner">
			{products.map((product, index) => (
				<li className="topProductsBannerItem" key={product.id}>
					<span className="topProductsBannerRank">#{index + 1}</span>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	)
}

export default TopProductsBanner
