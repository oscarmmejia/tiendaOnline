import LogisticsCard from '../../molecules/logisticsCard/LogisticsCard.jsx'
import './LogisticsNetwork.css'

const LOGISTICS_CAPABILITIES = [
	{
		id: 'quantumShipping',
		badge: 'SYS STATUS',
		status: '99.8% EFF',
		title: 'Quantum Shipping',
		description: 'Entrega desmaterializada instantánea mediante drones sub-orbitales.',
		accent: 'cyan',
	},
	{
		id: 'directDropLink',
		badge: 'CONNECT',
		status: 'LINK ACTIVE',
		title: 'Direct Drop Link',
		description: 'Los creadores cargan directamente sus modelos al puerto OKYDOKY.',
		accent: 'magenta',
	},
	{
		id: 'secureNeuralEscrow',
		badge: 'CIPHER',
		status: 'AES-256',
		title: 'Secure Neural Escrow',
		description: 'Pagos inteligentes validados por la red blockchain de OKYDOKY.',
		accent: 'cyan',
	},
]

const LogisticsNetwork = () => {
	return (
		<ul className="logisticsNetworkList" aria-label="Capacidades de la red logística">
			{LOGISTICS_CAPABILITIES.map(({ id, ...capability }) => (
				<li className="logisticsNetworkItem" key={id}>
					<LogisticsCard {...capability} />
				</li>
			))}
		</ul>
	)
}

export default LogisticsNetwork
