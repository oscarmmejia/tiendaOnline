import './TitleDescriptionComponent.css'

function TitleDescriptionComponent({
	subtitle,
	title,
	description,
	subtitleColor = 'pink',
}) {
	return (
		<section className="titleDescription">
			<h3
				className={`titleDescriptionSubtitle titleDescriptionSubtitle${subtitleColor === 'cyan' ? 'Cyan' : 'Pink'}`}
			>
				{subtitle}
			</h3>
			<h2 className="titleDescriptionTitle">{title}</h2>
			<p className="titleDescriptionDescription">{description}</p>
		</section>
	)
}

export default TitleDescriptionComponent
