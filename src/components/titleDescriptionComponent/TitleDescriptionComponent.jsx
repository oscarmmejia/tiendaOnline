import './TitleDescriptionComponent.css'

const TITLE_SUBTITLE_VARIANTS = {
	cyan: 'Cyan',
	pink: 'Pink',
}

const TitleDescriptionComponent = ({
	subtitle,
	title,
	description,
	subtitleColor = 'pink',
}) => {
	return (
		<section className="titleDescription">
			<h5
				className={`titleDescriptionSubtitle titleDescriptionSubtitle${TITLE_SUBTITLE_VARIANTS[subtitleColor] ?? TITLE_SUBTITLE_VARIANTS.pink}`}
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
