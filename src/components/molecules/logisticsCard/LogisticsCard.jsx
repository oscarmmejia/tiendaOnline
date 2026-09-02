import './LogisticsCard.css'

const ACCENT_CLASS_NAMES = {
	cyan: 'logisticsCardBadgeCyan',
	magenta: 'logisticsCardBadgeMagenta',
}

const LogisticsCard = ({ badge, status, title, description, accent = 'cyan' }) => {
	return (
		<article className="logisticsCard">
			<header className="logisticsCardHeader">
				<span className={`logisticsCardBadge ${ACCENT_CLASS_NAMES[accent]}`}>{badge}</span>
				<span className="logisticsCardStatus">{status}</span>
			</header>
			<h3 className="logisticsCardTitle">{title}</h3>
			<p className="logisticsCardDescription">{description}</p>
		</article>
	)
}

export default LogisticsCard
