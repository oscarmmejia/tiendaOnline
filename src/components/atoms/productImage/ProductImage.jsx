import { useState } from 'react'
import './ProductImage.css'

const ProductImage = ({ src, alt }) => {
	const [hasFailed, setHasFailed] = useState(false)

	if (!src || hasFailed) {
		return (
			<div className="productImage productImageFallback" role="img" aria-label={alt}>
				SIN SEÑAL
			</div>
		)
	}

	return (
		<img
			className="productImage"
			src={src}
			alt={alt}
			loading="lazy"
			onError={() => setHasFailed(true)}
		/>
	)
}

export default ProductImage
