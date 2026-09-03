import './ProtocolEvolution.css'

const SECTION_TITLE = 'Evolución de protocolos'
const SECTION_SUBTITLE = 'Rastreando los hitos criptográficos de nuestra red.'

const RocketIcon = () => (
	<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
		<path d="M13.5 2c3.6 1 6.5 4.4 6.5 8.3 0 2.6-1.1 4.9-2.9 6.5l-1.4 1.2v2.5a1 1 0 0 1-1.6.8l-2.1-1.6-2.1 1.6a1 1 0 0 1-1.6-.8V18l-1.4-1.2A8.6 8.6 0 0 1 4 10.3C4 6.4 6.9 3 10.5 2a5.6 5.6 0 0 1 3 0Zm-1.5 4a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 12 6Z" />
	</svg>
)

const ShieldIcon = () => (
	<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
		<path d="M12 2 4 5.2v6.1c0 4.6 3.2 8.9 8 10.7 4.8-1.8 8-6.1 8-10.7V5.2L12 2Zm0 5.4a2.4 2.4 0 0 1 1.2 4.5v2.3a1.2 1.2 0 0 1-2.4 0v-2.3A2.4 2.4 0 0 1 12 7.4Z" />
	</svg>
)

const PROTOCOL_ACCENT_VARIANTS = {
	cyan: 'Cyan',
	magenta: 'Magenta',
}

const PROTOCOLS = [
	{
		id: 'quantumShipping',
		version: 'V_1.0.4 - Protocolo establecido',
		title: 'Envío Cuántico',
		description:
			'Evitando las redes logísticas físicas. Nuestros algoritmos de enrutamiento patentados garantizan la transferencia instantánea de activos a través de sectores metropolitanos designados.',
		accent: 'cyan',
		icon: <RocketIcon />,
	},
	{
		id: 'neuralTrust',
		version: 'V_2.3.0 - Anulación de seguridad',
		title: 'Fideicomiso Neural Seguro',
		description:
			'Eliminando el fraude en las transacciones. Los pagos se bloquean mediante un consenso de hash neural biométrico hasta que el nodo personal del destinatario verifica el activo físico.',
		accent: 'magenta',
		icon: <ShieldIcon />,
	},
]

const ProtocolEvolution = () => {
	return (
		<section className="protocolEvolution" aria-labelledby="protocolEvolutionTitle">
			<h2 className="protocolEvolutionTitle" id="protocolEvolutionTitle">
				{SECTION_TITLE}
			</h2>
			<p className="protocolEvolutionSubtitle">{SECTION_SUBTITLE}</p>

			<ul className="protocolEvolutionList">
				{PROTOCOLS.map(({ id, version, title, description, accent, icon }) => (
					<li className={`protocolCard protocolCard${PROTOCOL_ACCENT_VARIANTS[accent]}`} key={id}>
						<span className="protocolCardIcon">{icon}</span>
						<p className="protocolCardVersion">{version}</p>
						<h3 className="protocolCardTitle">{title}</h3>
						<p className="protocolCardDescription">{description}</p>
					</li>
				))}
			</ul>
		</section>
	)
}

export default ProtocolEvolution
