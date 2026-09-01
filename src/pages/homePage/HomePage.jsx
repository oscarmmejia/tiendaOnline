import Hero from '../../components/hero/Hero.jsx'
import TitleDescriptionComponent from '../../components/titleDescriptionComponent/TitleDescriptionComponent.jsx'
import TopProductsBanner from '../../components/organisms/topProductsBanner/TopProductsBanner.jsx'
import CategoryCard from '../../components/categoryCard/CategoryCard.jsx'
import LogisticsNetwork from '../../components/organisms/logisticsNetwork/LogisticsNetwork.jsx'

const HomePage = () => {
	return (
		<>
			<Hero />
			<TitleDescriptionComponent
				subtitle='PREMIUM TIER'
				subtitleColor='pink'
				title='Los 5 más exclusivos'
				description='El material de mayor valor disponible ahora mismo en el nexus'
			/>
			<TopProductsBanner />
			<TitleDescriptionComponent
				subtitle='QUANTUM DEPARTMENT'
				subtitleColor='cyan'
				title='Categorías de Productos'
				description='Ponemos a tu disposición una oferta diversificada de productos'
			/>
			<CategoryCard />
			<TitleDescriptionComponent
				subtitle='GRID CAPABILITIES'
				subtitleColor='pink'
				title='La Red de Logística de OKYDOKY'
			/>
			<LogisticsNetwork />
		</>
	)
}

export default HomePage
