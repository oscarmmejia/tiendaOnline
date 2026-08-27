import { useState } from 'react'
import './ProductImage.css'

/**
 * Parte de los productos del sandbox apuntan a imagenes caidas, asi que se
 * muestra un marcador de posicion en lugar del icono de imagen rota.
 */
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
