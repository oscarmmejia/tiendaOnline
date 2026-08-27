import { useEffect, useState } from 'react'
import './CategoryCard.css'

const CATEGORIES_API_URL = 'https://api.escuelajs.co/api/v1/categories'

function CategoryCard() {
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await fetch(CATEGORIES_API_URL)

				if (!response.ok) {
					throw new Error('No se pudieron cargar las categorías')
				}

				const data = await response.json()
				setCategories(data.filter(({ id }) => id >= 1 && id <= 5))
			} catch {
				setError('No se pudieron cargar las categorías')
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	if (isLoading) {
		return <p className="categoryCardStatus">Cargando categorías...</p>
	}

	if (error) {
		return <p className="categoryCardStatus categoryCardError">{error}</p>
	}

	return (
		<section className="categoryCardList" aria-label="Categorías">
			{categories.map((category, index) => (
				<article
					className={`categoryCard ${index % 2 === 0 ? 'categoryCardCyan' : 'categoryCardPink'}`}
					key={category.id}
				>
					<img
						className="categoryCardImage"
						src={category.image}
						alt={category.name}
					/>
					<h3 className="categoryCardName">{category.name}</h3>
				</article>
			))}
		</section>
	)
}

export default CategoryCard