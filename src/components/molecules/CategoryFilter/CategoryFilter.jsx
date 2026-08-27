import { ALL_CATEGORIES } from '../../../services/productsApi'
import './CategoryFilter.css'

const CATEGORY_FILTER_ID = 'categoryFilter'

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
	return (
		<div className="categoryFilter">
			<label className="categoryFilterLabel" htmlFor={CATEGORY_FILTER_ID}>
				Categoría
			</label>
			<select
				id={CATEGORY_FILTER_ID}
				className="categoryFilterSelect"
				value={selectedCategory}
				onChange={(event) => onCategoryChange(event.target.value)}
			>
				<option value={ALL_CATEGORIES}>Todas</option>
				{categories.map(({ slug, name }) => (
					<option key={slug} value={slug}>
						{name}
					</option>
				))}
			</select>
		</div>
	)
}

export default CategoryFilter
