import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/routePaths'
import { isRequestCanceled } from '../../services/httpClient'
import { fetchCatalogCategories } from '../../services/productsApi'
import './CategoryCard.css'

const CATEGORY_CARD_VARIANTS = ['categoryCardCyan', 'categoryCardPink']

const getCategoryCardVariant = (index) => CATEGORY_CARD_VARIANTS[index % CATEGORY_CARD_VARIANTS.length]

const CategoryCard = () => {
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const controller = new AbortController()

		const loadCategories = async () => {
			try {
				setCategories(await fetchCatalogCategories(controller.signal))
			} catch (fetchError) {
				if (!isRequestCanceled(fetchError)) {
					setError('No se pudieron cargar las categorías')
				}
			} finally {
				setIsLoading(false)
			}
		}

		loadCategories()

		return () => controller.abort()
	}, [])

	if (isLoading) {
		return <p className="categoryCardStatus">Cargando categorías...</p>
	}

	if (error) {
		return <p className="categoryCardStatus categoryCardError">{error}</p>
	}

	return (
		<section className="categoryCardList" aria-label="Categorías">
			{categories.map(({ id, name, image }, index) => (
				<Link
					className="categoryCardLink"
					key={id}
					to={`${ROUTE_PATHS.products}?categoryId=${id}`}
				>
					<article
						className={`categoryCard ${getCategoryCardVariant(index)}`}
					>
						<img className="categoryCardImage" src={image} alt={name} />
						<h3 className="categoryCardName">{name}</h3>
					</article>
				</Link>
			))}
		</section>
	)
}

export default CategoryCard
