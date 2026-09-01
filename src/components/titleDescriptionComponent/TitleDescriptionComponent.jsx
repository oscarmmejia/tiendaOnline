import './TitleDescriptionComponent.css'

function TitleDescriptionComponent({
	subtitle,
	title,
	description,
	subtitleColor = 'pink',
}) {
	return (
		<section className="titleDescription">
			<h5
				className={`titleDescriptionSubtitle titleDescriptionSubtitle${subtitleColor === 'cyan' ? 'Cyan' : 'Pink'}`}
			>
				{subtitle}
			</h5>
			<h2 className="titleDescriptionTitle">{title}</h2>
			{description && (
				<p className="titleDescriptionDescription">{description}</p>
			)}
		</section>
	)
}

export default TitleDescriptionComponent
