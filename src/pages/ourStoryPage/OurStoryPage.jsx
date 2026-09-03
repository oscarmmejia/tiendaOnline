import ourStoryHero from '../../assets/img/ourStory/ourStoryHero.webp'
import ourStoryOrigin from '../../assets/img/ourStory/ourStoryOrigin.webp'
import ProtocolEvolution from '../../components/organisms/protocolEvolution/ProtocolEvolution.jsx'
import './OurStoryPage.css'

const OurStoryPage = () => {
	return (
		<>
			<section className="storyHero" aria-labelledby="storyHeroTitle">
				<img
					className="storyHeroBackground"
					src={ourStoryHero}
					alt=""
					aria-hidden="true"
				/>
				<div className="storyHeroShade" aria-hidden="true" />

				<div className="storyHeroContent">
					<span className="storyHeroTag">&gt; ARCHIVE_LOG: ORIGINS</span>
					<h1 className="storyHeroTitle" id="storyHeroTitle">
						Forjados en la era del neón
					</h1>
					<p className="storyHeroDescription">
						Desde los nodos de hardware subterráneos hasta la cima del comercio
						digital. No solo nos adaptamos al futuro; lo codificamos.
					</p>
				</div>
			</section>

			<section className="storyOrigin" aria-labelledby="storyOriginTitle">
				<img
					className="storyOriginImage"
					src={ourStoryOrigin}
					alt="Los fundadores de OKYDOKY trabajando en un taller de hardware"
				/>

				<div className="storyOriginText">
					<h2 className="storyOriginTitle" id="storyOriginTitle">
						Nuestra historia
					</h2>
					<p className="storyOriginParagraph">
						OKYDOKY no comenzó en una impecable sala de juntas corporativa. Surgió
						de los centros de hardware subterráneos, nacido de la necesidad de
						trascender los límites del comercio tradicional. Las calles exigían
						protocolos más rápidos, mayor tecnología y seguridad incuestionable.
					</p>
					<p className="storyOriginParagraph storyOriginParagraphMuted">
						Construimos una infraestructura de mercado diseñada para los
						edge-runners, los synth-weavers y los pioneros del enlace neural.
						Nuestra misión sigue siendo singular: entregar nuestros productos
						cuidadosamente seleccionados en sus manos antes de que los gigantes
						corporativos siquiera los conceptualicen.
					</p>
				</div>
			</section>
			<ProtocolEvolution />
		</>
	)
}

export default OurStoryPage
