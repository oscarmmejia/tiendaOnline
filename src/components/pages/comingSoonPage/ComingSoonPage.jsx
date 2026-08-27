import PageHeading from '../../molecules/pageHeading/PageHeading'
import './ComingSoonPage.css'

const ComingSoonPage = ({ title }) => {
	return (
		<section className="comingSoonPage">
			<PageHeading
				title={title}
				description="Esta sección del nexus todavía está en construcción. Vuelve pronto."
			/>
		</section>
	)
}

export default ComingSoonPage
