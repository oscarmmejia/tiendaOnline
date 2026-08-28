import { Link } from 'react-router-dom'
import PageHeading from '../../molecules/pageHeading/PageHeading'
import { ROUTE_PATHS } from '../../../routes/routePaths'
import './NotFoundPage.css'

const NotFoundPage = () => {
	return (
		<section className="notFoundPage">
			<PageHeading
				title="Error 404"
				description="La ruta que buscas no existe en el nexus de OKYDOKY."
			/>
			<Link className="notFoundPageLink" to={ROUTE_PATHS.home}>
				Volver al inicio
			</Link>
		</section>
	)
}

export default NotFoundPage
