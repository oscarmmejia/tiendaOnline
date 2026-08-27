import Hero from '../../hero/Hero.jsx'
import TitleDescriptionComponent from '../../titleDescriptionComponent/TitleDescriptionComponent.jsx'
import CategoryCard from '../../categoryCard/CategoryCard.jsx'

const HomePage = () => {
	return (
		<>
			<Hero />
			<TitleDescriptionComponent
				subtitle='QUANTUM DEPARTMENT'
				subtitleColor='cyan'
				title='Categorías de Productos'
				description='Ponemos a tu disposición una oferta diversificada de productos'
			/>
			<CategoryCard />
		</>
	)
}

export default HomePage
